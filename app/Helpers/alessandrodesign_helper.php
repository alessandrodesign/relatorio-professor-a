<?php

use App\Strategies\User\UserStrategyInterface;
use App\Strategies\UserStrategy;

if (!function_exists('user')) {
    function user(): ?UserStrategyInterface
    {
        return UserStrategy::user();
    }
}