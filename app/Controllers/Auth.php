<?php

namespace App\Controllers;

use App\Services\TeacherService;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Psr\Log\LoggerInterface;

class Auth extends BaseController
{
    use ResponseTrait;

    protected TeacherService $teacherService;


    public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger): void
    {
        parent::initController($request, $response, $logger);

        $this->teacherService = new TeacherService();
    }

    public function postLogin(): ResponseInterface
    {
        $rules = [
            'login' => 'required',
            'password' => 'required|min_length[8]|max_length[255]',
        ];

        if (!$this->validate($rules)) {
            return $this->fail($this->validator->getErrors());
        }

        try {
            return $this->respond(
                $this->teacherService->login(...$this->validator->getValidated())
            );
        } catch (\Exception $exception) {
            return $this->fail($exception->getMessage());
        }
    }

    public function getUser()
    {
        try {
            $token = explode(' ', $this->request->header('Authorization')->getValue())[1];
            return $this->respond($this->teacherService->validate($token));
        } catch (\Exception $exception) {
            return $this->fail($exception->getMessage());
        }
    }
}
