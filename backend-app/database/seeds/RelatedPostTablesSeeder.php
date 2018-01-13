<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\DatabaseManager;
use Carbon\Carbon;

class RelatedPostTablesSeeder extends Seeder
{
    /**
     * DatabaseManager
     *
     * @var $db
     */
    protected $db;

    /**
     * DatabaseSeeder __constructor
     *
     * @param DatabaseManager $db
     */
    public function __construct(DatabaseManager $db)
    {
        $this->db = $db;
    }

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->runTruncate();
        $this->runInsert();
    }

    /**
     * Run truncate methods.
     *
     * @return void
     */
    private function runTruncate()
    {
        $this->db->table('admins')->truncate();
        $this->db->table('categories')->truncate();
        $this->db->table('tags')->truncate();
        $this->db->table('comments')->truncate();
        $this->db->table('configs')->truncate();
        $this->db->table('posts')->truncate();
        $this->db->table('tag_post')->truncate();
    }

    /**
     * Run insert methods.
     *
     * @return void
     */
    private function runInsert()
    {
        for ($i = 1; $i < 11; ++$i) {
            $this->db->table('categories')->insert([
                'name' => "category-{$i}",
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);

            $this->db->table('posts')->insert([
                'admin_id' => 1,
                'category_id' => $i,
                'title' => "Title-{$i}",
                'md_content' => "This is {$i} content.",
                'html_content' => "<h2>This is {$i} content.</h2>",
                'publication_status' => ($i % 2 == 0) ? 'public' : 'private',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'published_at' => Carbon::now()
            ]);

            $this->db->table('comments')->insert([
                'post_id' => $i,
                'comment' => "This is {$i} comment.",
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);

            $this->db->table('tags')->insert([
                'name' => "tag-{$i}",
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);

            $this->db->table('tag_post')->insert([
                'tag_id' => $i,
                'post_id' => $i,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        }
    }
}
