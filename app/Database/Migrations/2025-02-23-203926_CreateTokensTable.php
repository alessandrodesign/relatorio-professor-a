<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateTokensTable extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id' => [
                'type' => 'INT',
                'unsigned' => true,
                'auto_increment' => true,
            ],
            'origin_type' => [
                'type' => 'VARCHAR',
                'constraint' => '100',
            ],
            'origin_id' => [
                'type' => 'INT',
                'unsigned' => true,
            ],
            'token' => [
                'type' => 'TEXT',
            ],
            'refresh_token' => [
                'type' => 'TEXT',
            ],
            'revoke' => [
                'type' => 'BOOLEAN',
                'default' => false,
            ],
            'created_at' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
            'updated_at' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
            'deleted_at' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
        ]);

        $this->forge->addKey('id', true);
        $this->forge->createTable('tokens', true);
    }

    public function down()
    {
        $this->forge->dropTable('tokens');
    }
}
