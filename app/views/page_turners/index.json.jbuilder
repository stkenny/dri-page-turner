json.array!(@page_turners) do |page_turner|
  json.extract! page_turner, :id
  json.url page_turner_url(page_turner, format: :json)
end
