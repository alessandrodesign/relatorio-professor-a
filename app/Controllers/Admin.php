<?php

namespace App\Controllers;

use App\Services\TeacherService;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Psr\Log\LoggerInterface;

class Admin extends BaseController
{
    use ResponseTrait;

    protected TeacherService $service;

    public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger): void
    {
        parent::initController($request, $response, $logger);

        $this->service = new TeacherService();
    }

    public function index()
    {
        //
    }

    public function getRegister()
    {
        return $this->render();
    }

    public function postRegister(): ResponseInterface
    {
        $rules = [
            'name' => 'required|min_length[3]|max_length[20]',
            'username' => 'required|min_length[3]|max_length[20]|is_unique[teacher.username]',
            'email' => 'required|valid_email|is_unique[teacher.email]',
            'password' => 'required|min_length[8]|max_length[255]',
        ];

        if (!$this->validate($rules)) {
            return $this->fail($this->validator->getErrors());
        }

        try {
            return $this->respondCreated(
                $this->service->register(...$this->validator->getValidated())
            );
        } catch (\Exception $exception) {
            return $this->fail($exception->getMessage());
        }
    }
}
