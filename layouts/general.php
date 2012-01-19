<!doctype html>
<html lang="en">
  <head>
    <title>Streamline</title>
    <meta charset="utf-8" />
    <meta name="description" content="" />
    <meta name="keywords" content="" />

    <!--[if lt IE 8]><script src="http://ie7-js.googlecode.com/svn/version/2.0(beta3)/IE8.js"></script><![endif]-->
    <!--[if lt IE 9]><script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script><![endif]-->

    <link rel="stylesheet" type="text/css" href="<?= $this->css_combine(array(
      '@vendor/grid-960-16.css',
      '@css/main.css'
    ),
    array(
      'src_mode' => true
    ),
    false) ?>" />

    <script type="text/javascript" src="<?= $this->js_combine(array(
      'jquery',
      'frontend_jquery',
      '@vendor/jquery-ui-1.8.5.custom.min.js',
      '@vendor/weld.js',
      '@vendor/weld.adapter.jquery.js',
      '@vendor/porter.js',
      '@vendor/underscore.js',
      '@vendor/history.adapter.jquery.js',
      '@vendor/history.js',
      '@vendor/jquery.scrollTo-min.js',
      '@vendor/jquery.livequery.min.js',
      '@vendor/eventemitter.js',
      '@vendor/jquery.mousewheel.js',
      '@vendor/waypoints.js',
      '@js/main.js'
    ),
    array(
      'src_mode' => true
    ),
    false) ?>"></script>
  </head>
  <body>
  	<div id="wrapper">
    	<? $this->render_page() ?>
    </div>
  </body>
</html>