<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class EmployeeId implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        //
    }
    public function passes($attribute, $value)
    {
        // Add your custom validation logic here
        return preg_match('/^[A-Z0-9]{5,10}$/', $value);
    }

    public function message()
    {
        return 'The :attribute is not a valid employee ID.';
    }
}
