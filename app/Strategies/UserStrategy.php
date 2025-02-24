<?php

namespace App\Strategies;

use App\Strategies\User\AbstractStrategy;
use App\Strategies\User\UserStrategyInterface;

class UserStrategy implements UserStrategyInterface
{
    private static ?UserStrategyInterface $userStrategy = null;

    public static function init(UserStrategyInterface $userStrategy): void
    {
        self::$userStrategy = $userStrategy;
    }

    public static function user(): ?UserStrategyInterface
    {
        return self::$userStrategy ?? new AbstractStrategy();
    }
}