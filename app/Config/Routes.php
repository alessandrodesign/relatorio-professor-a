<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->setAutoRoute(true);

$routes->get('/', 'Home::index', ['as' => 'home']);
$routes->get('dashboard', 'Dashboard::index', ['as' => 'dashboard']);
