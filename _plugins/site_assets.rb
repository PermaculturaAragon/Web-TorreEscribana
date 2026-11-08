# frozen_string_literal: true
require 'nokogiri'
require 'uri'
Jekyll::Hooks.register [:pages, :documents], :post_render do |page|
  next unless page.output_ext == '.html' && page.output.include?('<html')
  site = page.site
  base = site.config['baseurl'].to_s
  assets = site.data['image_assets'] || {}
  doc = Nokogiri::HTML5(page.output)
  local_path = lambda do |value|
    url = URI.parse(value.to_s)
    next nil if url.host && url.host != URI.parse(site.config['url']).host
    path = URI::DEFAULT_PARSER.unescape(url.path.to_s)
    path = path.delete_prefix(base) unless base.empty?
    path = File.expand_path(path, File.dirname(page.url)) unless path.start_with?('/')
    path
  rescue URI::InvalidURIError
    nil
  end
  doc.css('img[src]').each do |img|
    asset = assets[local_path.call(img['src'])]
    next unless asset
    variants = asset['variants']
    default = variants.find { |variant| variant['width'] >= 960 } || variants.last
    img['src'] = base + default['url']
    img['srcset'] = variants.map { |variant| "#{base}#{variant['url']} #{variant['width']}w" }.join(', ')
    img['sizes'] ||= if img.ancestors.any? { |n| n['class'].to_s.match?(/qh-img|logos-amigos/) }
                       '(max-width: 600px) 85vw, 360px'
                     elsif img.ancestors.any? { |n| n['class'].to_s.match?(/card-design|card-agenda|photo-item/) }
                       '(max-width: 600px) 92vw, 440px'
                     elsif img.ancestors.any? { |n| n['class'].to_s.include?('navbar-brand') }
                       '230px'
                     else
                       '(max-width: 800px) 94vw, 960px'
                     end
    img['width'] = asset['width'].to_s
    img['height'] = asset['height'].to_s
    img['decoding'] = 'async'
    img['loading'] ||= img.ancestors.any? { |n| n.name == 'nav' } ? 'eager' : 'lazy'
  end
  doc.css('[style]').each do |node|
    node['style'] = node['style'].gsub(/url\(['"]?([^'"\)]+)['"]?\)/) do |original|
      asset = assets[local_path.call(Regexp.last_match(1))]
      asset ? "url('#{base}#{asset['variants'].last['url']}')" : original
    end
  end
  doc.css('body').first&.xpath('.//text()')&.each do |text|
    next unless text.content.include?('Torre Escribana')
    next if text.ancestors.any? { |n| %w[script style code pre textarea svg].include?(n.name) || n['class'].to_s.split.include?('letralogo') }
    pieces = text.content.split('Torre Escribana', -1)
    pieces.each_with_index do |piece, index|
      if index.positive?
        span = Nokogiri::XML::Node.new('span', doc)
        span['class'] = 'marca-escribana'
        span.content = 'Torre Escribana'
        text.add_previous_sibling(span)
      end
      text.add_previous_sibling(Nokogiri::XML::Text.new(piece, doc)) unless piece.empty?
    end
    text.remove
  end
  doc.css('a[target="_blank"]').each { |a| a['rel'] = (a['rel'].to_s.split + ['noopener']).uniq.join(' ') }
  doc.css('a[href]').each do |a|
    href = a['href'].to_s
    a['href'] = href.delete_prefix(site.config['url'].to_s) if href.start_with?(site.config['url'].to_s + '/')
  end
  doc.css('i.fa,i.fas,i.fab').each { |icon| icon['aria-hidden'] = 'true' }
  page.output = doc.to_html
end
