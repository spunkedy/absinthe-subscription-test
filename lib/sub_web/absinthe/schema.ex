defmodule SubWeb.Schema do

  use Absinthe.Schema

  query do
    field :comments, :string  do
      resolve fn _,_ ->
        {:ok, "query:asdf"}
      end
    end
  end

  mutation do
    field :submit_comment, :string do
      arg :comment, non_null(:string)
      resolve fn args,_ ->
        {:ok, "mutate: " <> args.comment}
      end
    end
  end

  subscription do
    field :comment_added, :string do
      # The topic function is used to determine what topic a given subscription
      # cares about based on its arguments. You can think of it as a way to tell the
      # difference between
      # subscription {
      #   commentAdded(repoName: "absinthe-graphql/absinthe") { content }
      # }
      #
      # and
      #
      # subscription {
      #   commentAdded(repoName: "elixir-lang/elixir") { content }
      # }
      config fn args, _ ->
        {:ok, topic: "test"}
      end

      # this tells Absinthe to run any subscriptions with this field every time
      # the :submit_comment mutation happens.
      # It also has a topic function used to find what subscriptions care about
      # this particular comment
      trigger :submit_comment, topic: fn _ ->
        "test"
      end

      resolve fn comment, _, _ ->
        # this function is often not actually necessary, as the default resolver
        # for subscription functions will just do what we're doing here.
        # The point is, subscription resolvers receive whatever value triggers
        # the subscription, in our case a comment.
        IO.puts("sub resolver")
        {:ok, comment}
      end

    end
  end

end
