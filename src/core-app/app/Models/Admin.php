<?php

namespace Rubel\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Rubel\Models\Admin
 *
 * @property int $id
 * @property string $name
 * @property string $email
 * @property string $password
 * @property string|null $remember_token
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property string|null $deleted_at
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read \Illuminate\Database\Eloquent\Collection|\Rubel\Models\Post[] $posts
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Query\Builder|\Rubel\Models\Admin onlyTrashed()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Eloquent\Builder|\Rubel\Models\Admin whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\Rubel\Models\Admin whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\Rubel\Models\Admin whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\Rubel\Models\Admin whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\Rubel\Models\Admin whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\Rubel\Models\Admin wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\Rubel\Models\Admin whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\Rubel\Models\Admin whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\Rubel\Models\Admin withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\Rubel\Models\Admin withoutTrashed()
 * @mixin \Eloquent
 */
class Admin extends Authenticatable
{
    use Notifiable;
    use SoftDeletes;

    /**
     * The table associated with the model.
     *
     * @var string
    */
    protected $table = 'admins';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function posts()
    {
        return $this->hasMany(Post::class);
    }
}
