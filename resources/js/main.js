jQuery(function($) {
	var cms = new EventEmitter();

	var ls = Porter({
		session: {
			create: ['get', '/api/1/session/create'],
			destroy: ['get', '/api/1/session/destroy']
		},
		shop: {
			product: {
				get: ['get', '/api/1/shop/product/:id']
			},
			products: {
				list: ['get', '/api/1/shop/products/details'],
				count: ['get', '/api/1/shop/products/count']
			},
			categories: {
				list: ['get', '/api/1/shop/categories/details'],
				count: ['get', '/api/1/shop/categories/count']
			},
			customer: {
				get: ['get', '/api/1/shop/customer/:id'],
			},
			customers: {
				list: ['get', '/api/1/shop/customers/details'],
				achievements: {
					list: ['get', '/api/1/shop/customer/:id/achievements/']
				}
			}
		},
		core: {
			user: {
				get: ['get', '/api/1/core/user/:id'],
				update: ['post', '/api/1/core/user/:id']
			},
			users: {
				list: ['get', '/api/1/core/users'],
				count: ['get', '/api/1/core/users/count']
			}
		},
		cms: {
		
		},
		blog: {
			posts: {
				list: ['get', '/api/1/blog/posts/details'],
				count: ['get', '/api/1/blog/posts/count']
			},
			categories: {
				list: ['get', '/api/1/blog/categories/details'],
				count: ['get', '/api/1/blog/categories/count']
			}
		}
	});
	
	var site = Porter({
		data: ['get', '/site/data']
	});
	
	ls.shop.customers.list(function(error, data) {
		var customers = _.map(data.result.response.customers.customer, function(customer, num) {
			return {
				name: customer.first_name + ' ' + customer.last_name,
				email: customer.email ? customer.email : ''
			};
		});
		
		$('[rel-path="/store/customers"] ul.customers > li').weld(customers);
	});
	
	ls.shop.products.list(function(error, data) {
		var products = _.map(data.result.response.products.product, function(product, num) {
			return {
				title: product.name
			};
		});
		
		$('[rel-path="/store"] ul.products > li').weld(products);
		
		$(window).scroll(function() {
			var items = $('[rel-path="/store"] ul.products > li');
			var active_item = null;
			
			items.each(function() {
				if($(window).scrollTop() + $(window).height() / 2 > $(this).offset().top 
				&& $(window).scrollTop() + $(window).height() / 2 < $(this).offset().top + $(this).height()) {
					active_item = $(this);
				}
			});
			
			items.removeClass('active');
			
			if(active_item)
				active_item.addClass('active');
		});
	});
	
	ls.shop.categories.list(function(error, data) {
		var categories = _.map(data.result.response.categories.category, function(category, num) {
			return {
				title: category.name
			};
		});
		
		$('[rel-path="/store"] ul.categories > li').weld(categories);
	});
	
	
	ls.blog.categories.list(function(error, data) {
		var categories = _.map(data.result.response.categories.category, function(category, num) {
			return {
				title: category.title,
				content: category.content
			};
		});
		
		$('[rel-path="/blog"] ul.categories > li').weld(categories);
	});

	ls.blog.posts.list(function(error, data) {
		var posts = _.map(data.result.response.posts.post, function(post, num) {
			return {
				title: post.title,
				content: post.content
			};
		});
		
		$('[rel-path="/blog"] ul.posts > li').weld(posts);
	});
	
	site.data(function(error, data) {
		$('[rel-path="/contact"]').weld(data);
	});
	
	$('a').livequery('click', function() {
		var state = History.getState();
		var base_uri = location.protocol + '//' + location.host + '/';
		var uri = $(this).attr('href');
		
		if(uri.substr(0, base_uri.length) !== uri
		|| uri.substr(0, 1) !== '/')
			return true; // let the browser handle the anchor
		
		History.pushState({path: uri}, window.title, uri);
		
		var new_state = History.getState();
		
		if(state.url === new_state.url)
			return false; // we didn't go anywhere so don't do anything
		
		update_page();
		
		return false;
	});
	
	History.Adapter.bind(window, 'statechange', function() {
		var state = History.getState();
		
		update_page();
	});
	
	var update_page = function() {
		var state = History.getState();
		
		var base_uri = location.protocol + '//' + location.host + '/';
		
		var path = state.url.substr(base_uri.length - 1);
		
		$('.pages > li').stop(0, 1).fadeOut(500);
		$('[rel-path="' + path + '"]').stop(0, 1).fadeIn(500);
		
		var page = {
			path: path
		};
		
		cms.emit('page.view', [page]);
	};
	
	cms.on('page.view', function(page) {
		if(page.path === '/blog') {
			ls.blog.categories.list(function(error, data) {
				var categories = _.map(data.result.response.categories.category, function(category, num) {
					return {
						title: category.title,
						content: category.content
					};
				});
				
				$('[rel-path="/blog"] ul.categories > li').weld(categories);
			});
		
			ls.blog.posts.list(function(error, data) {
				var posts = _.map(data.result.response.posts.post, function(post, num) {
					return {
						title: post.title,
						content: post.content
					};
				});
				
				$('[rel-path="/blog"] ul.posts > li').weld(posts);
			});
		}
	});
	
	update_page();
	
	$(window).mousewheel(function(event, delta) {
		if(delta > 0)
			$('.back-to-top').addClass('scrolling');
		else
			$('.back-to-top').removeClass('scrolling');
			
		if($(window).scrollTop() < 5)
			$('.back-to-top').removeClass('scrolling');
	});
	
	$('.back-to-top').hover(function() {
		$(this).addClass('active');
	}, function() {
		$(this).removeClass('active');
	});
	
	$('.back-to-top').click(function() {
		$.scrollTo($('body'), 500);
		$(this).removeClass('scrolling');
		
		return false;
	});
});