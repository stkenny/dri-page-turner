require 'json'

class DriClient

  def initialize
    endpoint = Settings.dri.endpoint
    user = Settings.dri.user
    pass = Settings.dri.password

    @site = RestClient::Resource.new endpoint, user, pass
  end

  def page_to_object_id(page_id, solr_field)
    response = query("#{solr_field}:#{page_id}")
    return nil unless response[:status] == 200 

    json = JSON.parse(response[:body])
    doc = json['response']['docs'][0]

    doc['id']
  end

  def page_url(object_id, file_key)
    response = assets(object_id)
    return nil unless response[:status] == 200

    json = JSON.parse(response[:body])
    files = json[0]['files']

    files.each do |file|
      return file[file_key] if file.key?(file_key)
    end
  end

  private

  def query(query_param)
    get("catalog?q=#{query_param}")
  end

  def assets(object_id)
    post('get_assets', {'objects' => [ { 'pid' => "#{object_id}" } ]})
  end

  def get(path)
    handle_exception {
      response = @site[path].get(accept: :json)
      @output = { status: response.code, body: response.body }
    }

    @output
  end

  def post(path, params)
    handle_exception {
      response = @site[path].post(params.to_json, { content_type: :json, accept: :json })
      @output = { status: response.code, body: response.body }
    }

    @output
  end

  def handle_exception(&block)
      yield
    rescue => e
      if e.respond_to?(:response)
        @output = { :status => e.response.code, :body => e.response.body }
      else
        @output = { :status => 1, :body => e.message }
      end
    end

end
