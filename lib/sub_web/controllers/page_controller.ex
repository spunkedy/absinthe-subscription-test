defmodule SubWeb.PageController do
  use SubWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
