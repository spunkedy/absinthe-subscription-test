defmodule SubWeb.Router do
  use SubWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", SubWeb do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
  end


  scope "/api" do
    pipe_through :api

    forward "/graphiql", Absinthe.Plug.GraphiQL,
      schema: SubWeb.Schema

    forward "/graphql", Absinthe.Plug,
      schema: SubWeb.Schema
  end
  # Other scopes may use custom stacks.
  # scope "/api", SubWeb do
  #   pipe_through :api
  # end
end
