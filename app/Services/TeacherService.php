<?php

namespace App\Services;

use App\Entities\TeacherEntity;
use App\Entities\TokenEntity;
use App\Enums\StatusEnum;
use App\Libraries\Passwords;
use App\Libraries\TeacherTokenManager;
use App\Models\TeacherModel;
use App\Models\TokenModel;
use Exception;
use ReflectionException;
use stdClass;

class TeacherService
{
    private TeacherModel $model;
    private TeacherEntity|null $teacher;
    private TeacherTokenManager $tokenManager;
    public Exception|null $error = null;

    public function __construct()
    {
        $this->model = new TeacherModel();
        $this->tokenManager = new TeacherTokenManager();
    }

    /**
     * @param string $login
     * @param string $password
     * @return stdClass
     * @throws ReflectionException
     * @throws Exception
     */
    public function login(string $login, string $password): stdClass
    {
        $where = [
            'status' => StatusEnum::ACTIVE->value
        ];

        if (filter_var($login, FILTER_VALIDATE_EMAIL)) {
            $where['email'] = $login;
        } else {
            $where['username'] = $login;
        }

        /** @var TeacherEntity|null $teacher */
        $teacher = $this->model->where($where)->first();
        $this->teacher = $teacher;

        if (!$this->teacher) {
            throw new Exception(lang('Auth.user.notFound'));
        }

        if (!Passwords::verify($password, $this->teacher->password)) {
            throw new Exception(lang('Auth.access.denied'));
        }

        if (Passwords::needsRehash($this->teacher->password)) {
            $this->teacher->password = Passwords::toHash($password);
            $this->model->save($this->teacher);
        }

        return $this->generateToken($this->teacher);
    }

    /**
     * @param TeacherEntity $teacher
     * @return stdClass
     * @throws ReflectionException
     */
    private function generateToken(TeacherEntity $teacher): stdClass
    {
        $userData = [
            'uid' => $teacher->id,
            'role' => TokenEntity::ORIGIN_TYPE_TEACHER
        ];

        $tokens = new stdClass();

        $tokens->authorized = TokenEntity::AUTHORIZED_TEACHER;
        $tokens->token = $this->tokenManager->generateToken($userData);
        $tokens->refreshToken = $this->tokenManager->generateRefreshToken($userData);

        // Essa ação obriga acesso único
        TokenService::revokeTokens(TokenEntity::ORIGIN_TYPE_TEACHER, $this->teacher->id);

        TokenService::add(TokenEntity::ORIGIN_TYPE_TEACHER, $this->teacher->id, $tokens);

        return $tokens;
    }

    /**
     * @param string $name
     * @param string $username
     * @param string $email
     * @param string $password
     * @return TeacherEntity
     * @throws ReflectionException
     */
    public function register(string $name, string $username, string $email, string $password): TeacherEntity
    {
        $this->teacher = new TeacherEntity();
        $this->teacher->name = $name;
        $this->teacher->username = $username;
        $this->teacher->email = $email;
        $this->teacher->setPassword($password);

        $this->model->save($this->teacher);

        $this->teacher->id = $this->model->getInsertID();

        return $this->teacher;
    }

    /**
     * @param string|null $token
     * @return stdClass
     * @throws Exception
     */
    public function validate(?string $token = null): stdClass
    {
        if (!$token) {
            throw new Exception(lang('Auth.tokenRequired'));
        }

        $decodedToken = $this->tokenManager->validateToken($token);

        $tokenEntity = TokenService::find($decodedToken['role'], $decodedToken['uid'], $token);

        if (!$tokenEntity) {
            throw new Exception(lang('Auth.invalidToken', [$token]));
        }

        /** @var TeacherEntity|null $teacher */
        $teacher = $this->model->where([
            'status' => StatusEnum::ACTIVE->value,
            'id' => $tokenEntity->origin_id
        ])->first();

        if (!$teacher) {
            throw new Exception(lang('Auth.access.denied'));
        }

        session()->set('token', $token);

        return (object)[
            'name' => $teacher->name,
            'username' => $teacher->username,
            'email' => $teacher->email
        ];
    }

    public function isLogged(?string $token = null): TeacherEntity|false
    {
        if (!$token) {
            return false;
        }

        try {
            $decodedToken = $this->tokenManager->validateToken($token);
        } catch (Exception $exception) {
            $this->error = $exception;
            return false;
        }

        $tokenEntity = TokenService::find($decodedToken['role'], $decodedToken['uid'], $token);

        if (!$tokenEntity) {
            return false;
        }

        /** @var TeacherEntity|null $teacher */
        $teacher = $this->model->where([
            'status' => StatusEnum::ACTIVE->value,
            'id' => $tokenEntity->origin_id
        ])->first();

        if (!$teacher) {
            return false;
        }

        return $teacher;
    }

    public function teste()
    {
// Renovando os tokens utilizando o refresh token
//        try {
//            $newTokens = $tokenManager->refreshTokens($refreshToken);
//            echo "Novo Token: " . $newTokens['token'] . PHP_EOL;
//            echo "Novo Refresh Token: " . $newTokens['refresh_token'] . PHP_EOL;
//        } catch (Exception $e) {
//            echo "Erro ao renovar os tokens: " . $e->getMessage() . PHP_EOL;
//        }
    }
}