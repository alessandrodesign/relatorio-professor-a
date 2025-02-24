<?php

namespace App\Libraries;

/**
 * Class Passwords
 *
 * Fornece métodos utilitários para manipulação de senhas, abstraindo as funções nativas do PHP.
 */
abstract class Passwords
{
    /**
     * Algoritmo padrão para hashing.
     *
     * @var string|int
     */
    protected static string|int $algo = PASSWORD_DEFAULT;

    /**
     * Opções padrão para o algoritmo de hash.
     *
     * @var array
     */
    protected static array $options = [];

    /**
     * Gera um hash para a senha em texto plano utilizando o algoritmo e as opções padrão.
     *
     * @param string $password Senha em texto plano.
     * @return string Senha hasheada.
     */
    public static function toHash(string $password): string
    {
        return password_hash($password, self::$algo, self::$options);
    }

    /**
     * Retorna um objeto PasswordHashInfo com as informações do hash da senha.
     *
     * @param string $password Pode ser a senha em texto plano ou já hasheada.
     * @return PasswordHashInfo
     */
    public static function getInfo(string $password): PasswordHashInfo
    {
        $info = password_get_info($password);
        return new PasswordHashInfo($info);
    }

    /**
     * Garante que a senha fornecida esteja hasheada.
     * Caso não esteja, realiza o hash e retorna-o.
     *
     * @param string $password Senha em texto plano ou já hasheada.
     * @return string Senha hasheada.
     */
    public static function ensureHash(string $password): string
    {
        $info = self::getInfo($password);
        if (!$info->isHashed()) {
            return self::toHash($password);
        }
        return $password;
    }

    /**
     * Verifica se uma senha em texto plano corresponde ao hash fornecido.
     *
     * @param string $password Senha em texto plano.
     * @param string $hash Hash para comparação.
     * @return bool
     */
    public static function verify(string $password, string $hash): bool
    {
        return password_verify($password, $hash);
    }

    /**
     * Verifica se o hash atual precisa ser rehashado de acordo com o algoritmo e opções atuais.
     *
     * @param string $hash Hash existente.
     * @return bool
     */
    public static function needsRehash(string $hash): bool
    {
        return password_needs_rehash($hash, self::$algo, self::$options);
    }

    /**
     * Caso o hash atual precise ser rehashado, gera um novo hash baseado na senha fornecida.
     * Caso contrário, retorna o hash original.
     *
     * @param string $password Senha em texto plano.
     * @param string $hash Hash existente.
     * @return string
     */
    public static function rehashIfNeeded(string $password, string $hash): string
    {
        if (self::needsRehash($hash)) {
            return self::toHash($password);
        }
        return $hash;
    }
}
