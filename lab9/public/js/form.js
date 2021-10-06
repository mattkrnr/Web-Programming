$('#fib_form').submit((event) => {
    event.preventDefault();
    if(!$('#number').val() || parseInt($('#number').val()) === "NaN" ) {
        $('#error_message').show();
        $('#error_message').html('Number is required.');
        $('#number').focus();
    }
    else {
        $('#error_message').hide();

        let fib = getFibonnaci(parseInt($('#number').val()));
        let li_class = "";

        if(isPrime(fib))
            li_class = "is-prime";
        else
            li_class = "not-prime";

        const li = `<li class=${li_class}> The Fibonacci of ${$('#number').val()} is ${fib}.</li>`;

        $('#results').append(li);
        $('#fib_form').trigger('reset');
        $('#number').focus();
    }
});

function getFibonnaci(num)
{
    if(num < 1)
        return 0;
    if(num===1)
        return 1;
    else
    {
        sum = getFibonnaci(num-1) + getFibonnaci(num-2);
        return sum;
    }
}

function isPrime(num)
{
    for(i = 2; i < num; i++)
    if(num % i === 0) 
        return false;

    return (num > 1);
}