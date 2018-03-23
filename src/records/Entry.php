<?php
/**
 * Form Builder plugin for Craft CMS 3.x
 *
 * Craft CMS plugin that lets you create and manage forms for your front-end.
 *
 * @link      https://roundhouseagency.com
 * @copyright Copyright (c) 2018 Roundhouse Agency (roundhousepdx)
 */

namespace roundhouse\formbuilder\records;

use craft\db\ActiveRecord;
use yii\db\ActiveQueryInterface;

class Entry extends ActiveRecord
{
    // Public Static Methods
    // =========================================================================

    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%formbuilder_entries}}';
    }

    /**
     * Get element
     *
     * @return ActiveQueryInterface
     */
    public function getElement(): ActiveQueryInterface
    {
        return $this->hasOne(Element::class, ['id' => 'id']);
    }

    /**
     * Return entry's form
     *
     * @return ActiveQueryInterface
     */
    public function getForm(): ActiveQueryInterface
    {
        return $this->hasOne(Form::class, ['id' => 'formId']);
    }

    /**
     * Return fieldlayout
     *
     * @return ActiveQueryInterface
     */
    public function getFieldLayout(): ActiveQueryInterface
    {
        return $this->hasOne(FieldLayout::class,
            ['id' => 'fieldLayoutId']);
    }

}
