<?php

namespace App\Strategies\User;

class AbstractStrategy implements UserStrategyInterface
{
    public ?int $id = null;
    public ?string $name = null;
    public ?string $username = null;
    public ?string $email = null;
}