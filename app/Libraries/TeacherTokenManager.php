<?php

namespace App\Libraries;

use App\ThirdParty\AbstractTokenManager;
use stdClass;

class TeacherTokenManager extends AbstractTokenManager
{
    protected function getTokenSecret(): string
    {
        return 'ATKFKLBH9EwcH1gE/0EO3TVMkXpE5x1+yVKi+iff62s=';
    }

    protected function getRefreshTokenSecret(): string
    {
        return '/ERUqkDi+ilogXhxYnCQRJvhaIw+4a1iO4gFrnhTNKs=';
    }

    protected function getTokenPayload(array $data): array
    {
        return [
            'data' => Crypto::encrypt($data, $this->getTokenSecret())
        ];
    }

    protected function getRefreshTokenPayload(array $data): array
    {
        return [
            'data' => Crypto::encrypt($data, $this->getTokenSecret())
        ];
    }

    protected function parser(stdClass $data): object|array|string
    {
        return Crypto::decrypt($data->data, $this->getTokenSecret());
    }
}
