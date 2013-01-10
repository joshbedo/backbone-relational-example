(function(){
	window.App = {
        Models: {},
        Views: {},
        Collections: {}
    };


    window.template = function(id){
        return _.template($('#' + id).html());
    };	

	    App.Models.MovieModel = Backbone.RelationalModel.extend({
	    	idAttribute: 'movieID'
	    });

	    App.Models.GameModel = Backbone.RelationalModel.extend({
	    	idAttribute: 'gameID'
	    })

	    App.Models.StoreModel = Backbone.RelationalModel.extend({
	    	idAttribute: 'storeID',
	    	url: 'js/data/storemodel.json',
	    	relations: [
				{
					type: Backbone.HasMany,
					key: "movies",
					relatedModel: App.Models.MovieModel,
					includeInJSON: Backbone.Model.prototype.movieID,
					reverseRelation: {
						key: 'inStore',
						includeInJSON: Backbone.Model.prototype.storeID
					}
				},
				{
					type: Backbone.HasMany,
					key: "games",
					relatedModel: App.Models.GameModel,
					includeInJSON: Backbone.Model.prototype.storeID,
					reverseRelation: {
						key: 'inStore',
						includeInJSON: Backbone.Model.prototype.storeID
					}

				}
	    	]
	    });
		    var storeModel = new App.Models.StoreModel();
	        storeModel.fetch({success:function (collection,response) {
	            console.log("Woohooo!: Fetch Store Model!");
	            console.log ("Relational Model : " + storeModel.get('movies').at(0).get('name'));

	            //how to display movies
	            var movies = storeModel.get('movies'),
	            	games = storeModel.get('games');

	            console.log(storeModel.get('games'))
	            _.each(movies.models, function(movie, i){
	            	console.log(movie.get('inStore').get('name'));
	            	$('.movieList').append('<li>' + movie.get('name') + '</li>');
	            });

	            _.each(games.models, function(game, i){
	            	$('.gameList').append('<li>' + game.get('title') + '</li');
	            })


	            
	            console.log ("Reverse Relation : " + storeModel.get('movies').at(0).get('inStore').get('name'));
	        },
	            error:function (collection, response) {
	                console.log("Error: Fetching Store!");
	            }
	        });
})();