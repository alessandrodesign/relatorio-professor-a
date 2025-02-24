<?php

namespace App\Libraries;

/**
 * Class PasswordHashInfo
 *
 * Encapsula as informações retornadas por password_get_info(), facilitando o acesso aos dados do hash.
 */
class PasswordHashInfo
{
    /**
     * Indica se a senha já está hasheada.
     *
     * @var bool
     */
    private bool $isHashed;

    /**
     * Nome do algoritmo utilizado para o hash.
     *
     * @var string
     */
    private string $algorithmName;

    /**
     * Opções utilizadas durante a geração do hash.
     *
     * @var array
     */
    private array $options;

    /**
     * Construtor que recebe o array retornado por password_get_info().
     *
     * @param array $info Array com informações do hash.
     */
    public function __construct(array $info)
    {
        $this->isHashed = ($info['algo'] !== 0);
        $this->algorithmName = $info['algoName'] ?? '';
        $this->options = $info['options'] ?? [];
    }

    /**
     * Verifica se a senha já está hasheada.
     *
     * @return bool
     */
    public function isHashed(): bool
    {
        return $this->isHashed;
    }

    /**
     * Retorna o nome do algoritmo utilizado.
     *
     * @return string
     */
    public function getAlgorithmName(): string
    {
        return $this->algorithmName;
    }

    /**
     * Retorna as opções usadas na geração do hash.
     *
     * @return array
     */
    public function getOptions(): array
    {
        return $this->options;
    }
}
