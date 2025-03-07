<?php

namespace App\Enums;

enum StatusEnum: int
{
    case INACTIVE = 0;
    case ACTIVE = 1;
    case DELETED = 2;
    case BANNED = 3;
}
