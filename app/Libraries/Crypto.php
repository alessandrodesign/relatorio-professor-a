<?php

namespace App\Libraries;

class Crypto
{
    /**
     * Método de criptografia a ser utilizado.
     *
     * @var string
     */
    protected const string METHOD = 'AES-256-CBC';

    /**
     * Criptografa um dado utilizando uma chave.
     *
     * O processo gera um vetor de inicialização (IV) aleatório, que é prefixado
     * aos dados criptografados. Em seguida, o resultado é codificado em base64.
     *
     * @param object|array|string $data Dados a serem criptografados.
     * @param string $key Chave de criptografia.
     * @return string Dado criptografado, em base64.
     */
    public static function encrypt(object|array|string $data, string $key): string
    {
        if (!is_string($data)) {
            $data = serialize($data);
        }

        // Tamanho do IV de acordo com o método.
        $ivLength = openssl_cipher_iv_length(self::METHOD);
        $iv = openssl_random_pseudo_bytes($ivLength);

        // Deriva uma chave de 256 bits usando hash SHA-256 da chave fornecida.
        $encryptionKey = hash('sha256', $key, true);

        // Criptografa os dados usando o método, chave derivada e IV.
        $encryptedData = openssl_encrypt($data, self::METHOD, $encryptionKey, OPENSSL_RAW_DATA, $iv);

        // Concatena o IV e os dados criptografados e codifica o resultado em base64.
        return base64_encode($iv . $encryptedData);
    }

    /**
     * Descriptografa um dado utilizando uma chave.
     *
     * O método espera um dado criptografado em base64 que contenha o IV prefixado.
     *
     * @param string $encryptedData Dado criptografado, em base64.
     * @param string $key Chave de criptografia.
     * @return object|array|string Dados descriptografados.
     */
    public static function decrypt(string $encryptedData, string $key): object|array|string
    {
        // Decodifica a string base64 para recuperar o IV e os dados criptografados.
        $data = base64_decode($encryptedData);
        $ivLength = openssl_cipher_iv_length(self::METHOD);

        // Extrai o IV e o texto cifrado.
        $iv = substr($data, 0, $ivLength);
        $cipherText = substr($data, $ivLength);

        // Deriva a chave de 256 bits a partir da chave fornecida.
        $encryptionKey = hash('sha256', $key, true);

        // Descriptografa os dados.
        $data = openssl_decrypt($cipherText, self::METHOD, $encryptionKey, OPENSSL_RAW_DATA, $iv);

        return unserialize($data);
    }
}
