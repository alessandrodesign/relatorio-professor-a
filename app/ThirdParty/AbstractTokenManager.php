<?php

namespace App\ThirdParty;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Exception;
use stdClass;

/**
 * Class AbstractTokenManager
 *
 * Gerencia a criação, validação e renovação de tokens e refresh tokens usando JWT.
 *
 * Validade do token: 1 hora (3600 segundos)
 * Validade do refreshToken: 1 semana (604800 segundos)
 *
 * Para utilizar esta classe, implemente os métodos abstratos que fornecem:
 * - A chave secreta para o token e para o refreshToken.
 * - Os dados adicionais do payload para cada tipo de token.
 */
abstract class AbstractTokenManager
{
    /**
     * Tempo de expiração do token em segundos (1 hora).
     * @var int
     */
    protected int $tokenExpiry = 3600;

    /**
     * Tempo de expiração do refresh token em segundos (1 semana).
     * @var int
     */
    protected int $refreshTokenExpiry = 604800;

    /**
     * Retorna a chave secreta para assinar o token.
     *
     * @return string
     */
    abstract protected function getTokenSecret(): string;

    /**
     * Retorna a chave secreta para assinar o refresh token.
     *
     * @return string
     */
    abstract protected function getRefreshTokenSecret(): string;

    /**
     * Retorna dados adicionais para compor o payload do token.
     *
     * Exemplo: ['uid' => 123, 'role' => 'admin']
     *
     * @param array $data Dados iniciais.
     * @return array Payload customizado para o token.
     */
    abstract protected function getTokenPayload(array $data): array;

    /**
     * Retorna dados adicionais para compor o payload do refresh token.
     *
     * @param array $data Dados iniciais.
     * @return array Payload customizado para o refresh token.
     */
    abstract protected function getRefreshTokenPayload(array $data): array;

    abstract protected function parser(stdClass $data): object|array|string;

    /**
     * Gera um token JWT com validade de 1 hora.
     *
     * @param array $data Dados para compor o payload.
     * @return string
     */
    public function generateToken(array $data): string
    {
        $issuedAt = time();
        $payload = array_merge(
            [
                'iat' => $issuedAt,
                'exp' => $issuedAt + $this->tokenExpiry,
            ],
            $this->getTokenPayload($data)
        );
        return JWT::encode($payload, $this->getTokenSecret(), 'HS256');
    }

    /**
     * Gera um refresh token JWT com validade de 1 semana.
     *
     * @param array $data Dados para compor o payload.
     * @return string
     */
    public function generateRefreshToken(array $data): string
    {
        $issuedAt = time();
        $payload = array_merge(
            [
                'iat' => $issuedAt,
                'exp' => $issuedAt + $this->refreshTokenExpiry,
            ],
            $this->getRefreshTokenPayload($data)
        );
        return JWT::encode($payload, $this->getRefreshTokenSecret(), 'HS256');
    }

    /**
     * Valida um token JWT.
     *
     * @param string $token
     * @return object|array|string Dados decodificados do token.
     * @throws Exception Se o token for inválido ou expirado.
     */
    public function validateToken(string $token): object|array|string
    {
        try {
            return $this->parser(JWT::decode($token, new Key($this->getTokenSecret(), 'HS256')));
        } catch (Exception $e) {
            throw new Exception(lang('Auth.invalidToken', [$e->getMessage()]));
        }
    }

    /**
     * Valida um refresh token JWT.
     *
     * @param string $refreshToken
     * @return object Dados decodificados do refresh token.
     * @throws Exception Se o refresh token for inválido ou expirado.
     */
    public function validateRefreshToken(string $refreshToken): object
    {
        try {
            return JWT::decode($refreshToken, new Key($this->getRefreshTokenSecret(), 'HS256'));
        } catch (Exception $e) {
            throw new Exception("Refresh token inválido: " . $e->getMessage());
        }
    }

    /**
     * Renova os tokens usando um refresh token válido.
     *
     * @param string $refreshToken Refresh token para renovação.
     * @return array Array contendo o novo token e refresh token.
     * @throws Exception Se o refresh token for inválido.
     */
    public function refreshTokens(string $refreshToken): array
    {
        $decodedRefresh = $this->validateRefreshToken($refreshToken);
        // Converte o objeto decodificado em array (caso seja necessário extrair informações, como uid, etc.)
        $data = (array)$decodedRefresh;
        $newToken = $this->generateToken($data);
        $newRefreshToken = $this->generateRefreshToken($data);

        return [
            'token' => $newToken,
            'refresh_token' => $newRefreshToken,
        ];
    }
}