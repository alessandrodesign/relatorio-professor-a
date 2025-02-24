<?php

namespace App\Services;

use App\Entities\TokenEntity;
use App\Models\TokenModel;
use ReflectionException;
use stdClass;

/**
 * Class TokenService
 *
 * Gerencia operações relacionadas aos tokens, incluindo revogação.
 */
class TokenService
{
    /**
     * @param string $originType
     * @param int $originId
     * @param string $token
     * @return array|object|null
     */
    public static function find(string $originType, int $originId, string $token): object|array|null
    {
        $tokenModel = new TokenModel();
        return $tokenModel->where([
            'token' => $token,
            'revoke' => false,
            'origin_id' => $originId,
            'origin_type' => $originType,
        ])->first();
    }

    /**
     * @param string $originType
     * @param int $originId
     * @param stdClass $tokens
     * @return void
     * @throws ReflectionException
     */
    public static function add(string $originType, int $originId, stdClass $tokens): void
    {
        $tokenEntity = new TokenEntity();
        $tokenEntity->origin_type = $originType;
        $tokenEntity->origin_id = $originId;
        $tokenEntity->token = $tokens->token;
        $tokenEntity->refresh_token = $tokens->refreshToken;
        $tokenEntity->revoke = false;
        $tokenModel = new TokenModel();
        $tokenModel->save($tokenEntity);
    }

    /**
     * Revoga todos os tokens de um professor específico.
     *
     * Atualiza todos os registros em que:
     * - origin_type é "teacher"
     * - origin_id é igual ao ID fornecido
     *
     * @param string $originType
     * @param int $originId
     * @return int Número de registros atualizados.
     * @throws ReflectionException
     */
    public static function revokeTokens(string $originType, int $originId): int
    {
        $tokenModel = new TokenModel();

        $tokenModel->where([
            'origin_type' => $originType,
            'origin_id' => $originId,
        ])->set('revoke', true)->update();

        return $tokenModel->db->affectedRows();
    }
}
