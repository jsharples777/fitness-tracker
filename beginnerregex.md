# Regular Expressions and You

Together, we are going to walk-through one of the more arcane areas of coding, **Regular Expressions**, or more
colloquially known as _Regex_. Regex are used by programmers for a variety of reasons, but at it's heart regex is
pattern matching. A regex is a description that is used to parse some content to either:

1. See if the content matches the regex - *validation*; or
2. See if the content contains one or more copies of the regex, for searching, or even search and replace - *content
   parsing*

## Why would we want to learn this?

This is a good question. In the age of the modern web browser, it is pretty straight forward to find a regex that can be
used to accomplish what we need. Need a user to input a valid email address? A quick google search nets us the following
regex:

```regexp
(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])
```

Looking at this is a little overwhelming, perhaps a simpler version might suffice:

```regexp
([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})
```

How do we know if this would even work? There are plenty of useful resources on the internet, but there is no excuse for
a programmer inserting things like this into their code without, at least a cursory, understanding of how it works.

Unfortunately this still looks a little like gibberish.

So let's start with some slightly less complex, a date in format DD/MM/YYYY and work our way through the process of
validating this and learn some of the elements of regex on the way and then revisit the email validation regular
expression and understand it.

## Summary

We are going to work our through the various parts of a regex expression for validating a date in the format DD/MM/YYYY. We
are going to follow the structure in the [table of contents](#table-of-contents) below, and discuss each aspect.

Then we are tackle a more complex date example and then return to our second regex for validating an email address and
understand how it works.

## Table of Contents

- [Anchors](#anchors)
- [Character Classes and Bracket Expressions](#character-classes-and-bracket-expressions)
- [Grouping Constructs](#grouping-constructs)
- [Quantifiers](#quantifiers)
- [The OR Operator](#the-or-operator)
- [Character Escapes](#character-escapes)
- [Flags](#flags)
- [Complex Example](#complex-example)
- [Revisiting Email Validation](#revisiting-email-validation)
- [Further Reading](#further-reading-and-learning)
- [Questions and Comments](#questions-and-comments)

## Regex Components

### Anchors

The first thing to talk about is term *anchors*, which is **how do we tell whatever we are using to apply the regex to
the content, where to start and end with our regex**. Anchors are not part of the content being parsed, but are triggers
that are used by the regex engine to match a position immediately before and after the regex.

For example, let use say we have the text:

```
The Battle of Waterloo was fought on Sunday, 18/06/1815.
```

We want to match the date in the text, but ignore the rest. Normally a regex would begin with the start anchor `^` which
matches the start of the content  (or the beginning of any further newlines if the multiline [flag](#flags) `m` is used,
see later).

In this case, using the start anchor `^` is not useful, so let's simply the content to just the date, which might be
 validating some user input in an HTML form. Our content is now.

```
18/06/1815
```

We are going to use the start anchor `^` to match the start of the content, and then the end anchor `$` to match the end
of the string (line). If the content included more text after the date and we would normally match the date, the regex
would fail as it would include the content to the end of the string (or end of the line).

We are going to assume we are validating just a date, and want to tell the user if **anything** other than the *exact*
date format has been supplied.

Our starting regex is therefore:

```jsregexp
/^$/
```

We are assuming *Javascript* here, and in Javascript the definition of the regex starts with `/` and ends with `/`. We
have have the / character in our dates, so we there is an immediate problem with using the / character in Javascript
regexs. We will learn about [character escapes](#character-escapes) a little later, but a quick preview is that a
preceeding backslash `\` will allow the character to be used normally.

Ok, to start matching our date, we need to be able to say we need to match a number.

There are a number of ways to do this. A single digit can be represented in regex via what is called
a [character class](#character-classes-and-bracket-expressions), so let us move on to that aspect of regex.

### Character Classes and Bracket Expressions

A character class in regex is just a way of matching specific types of characters in the content.

To match a digit (integer value of 0 to 9) in regex, the following character class options exist:

1. `\d` which will match any one digit. Note the lowercase `d`. Upper case `D` would any single character that is **
   not** a digit. Don't mix the two by accident!
2. `[0123456789]` - this is a *bracket expression*. This regex will match a single character from the choices between
   the `[]`.

There is a shorthand for the range, `[0-9]` which will automatically include all the numbers between 0 and 9. The same
construct can be used for matching alphabet characters such as `[a-z]` to match any lowercase letter from a to z. Or
even can be combined with all sorts of combinations, such as odd combinations like `[0-3a-g]` which matches any single
character that is 0 to 3 or a to g (lowercase).

We have enough to make a first attempt at a regex for the date. We need two digits, a /, two digits, a /, and four
digits, remembering to escape the forward slash with a backslash first. A first attempt could then be:

```jsregexp
/^\d\d\/\d\d\/\d\d\d\d$/
```

or alternatively using bracket expressions:

```jsregexp
/^[0-9][0-9]\/[0-9][0-9]\/[0-9][0-9][0-9][0-9]$/
```

Either regex will certainly match the date of the Battle of Waterloo above and any other date in the format DD/MM/YYYY.

Job done!

Well, not quite, how do we make sure the day portion is not greater than 31? The months should be 01 to 12 also.

We can see from the bracket expression version of our regex, there are some hints about how this could be done. if the
very first bracket was `[0-3]` then we are forcing a date that at least starts with a 0, 1, 2, or 3. But how do we limit
the second digit of the date depending on the first digit?

To accomplish this we are going to need a new regex aspect called [groups](#grouping-constructs), so lets move on.

Before we move one, there are some other character classes that are extremely useful as follows:

- `.` which matches any character except a newline
- `\s` for whitespaces (spaces, tabs)
- `\w` for any alphabet character, digit, or the underscore `_` character.

There are a special set of classes (one of which we mentioned above) called **NOT** classes. As in, match this if it is
not one of the following:

- `\D` mentioned above, NOT a digit
- `\W` not any of an alphabet character, digit or underscore
- `\S` not whitespace
- using a `^` at the start of a bracket `[]` means NOT for anything in the bracket. For example `[^a-c]` mean a
  character that is NOT a, b, or c.

### Grouping Constructs

A group construct (or just group) is designated by parts of a regexp between brackets `()` and allows us to combine
multiple single character matches together and apply further rules on the group (such as the [OR](#the-or-operator)
which we will learn about next).

If we look at just the day portion of at our date format, we have three different criteria:

1. The date could be less than 10, in which case we would want to match a zero following by 1 to 9. We can do that in
   regex with what we already know. That would be `0[1-9]`, a zero followed by a single digit of 1 to 9;
2. If the date is greater than 9 but less than 30, we want a 1 or 2 first, then 0 to 9, or `[12]\d`; and
3. If the date is greater than 29, we want a 3 first, and either 0 or 1, which is `3[01]`.

We have all the components of validating the days, and we are going to *group* them together into one expresion with
brackets.

Think of a group, as a logical **part** of the content to which certain rules would apply. The months part of a date is
another group. From the discusion already it should be relatively easy to see the month must be two parts, `0[1-9]`
and `1[0-2]` which will give us months from 01 to 12.

So our regex is?

```jsregexp
/^(0[1-9][12]\d3[01])\/(0[1-9]1[0-2])\/\d\d\d\d$/
```

That doesn't look right. How does the regex engine (Javascript in our case) know that the `0[1-9]` in the date applies
if the date is less than 10, but to use the other parts if the date is greater than 10?

It does, in fact, not know that, we have to tell it there are three distinct parts to our group, and that only one part
applies at any given time. To do that we use the [OR](#the-or-operator) operator.

### The OR Operator

The OR operator or vertical bar `|` is used tell the engine to match the regex part *before* the `|` and if that fails,
use the part *after* the `|`. You can chain the OR operator together by just adding more `|` and another regex part.

This solves our day and month dilemma above immediately. Our day group is now

```regexp
(0[1-9]|[12]\d|3[01])
```

Now we are saying, match the first part, if not, then the second part, and, again, if not, use the third part.
Fantastic!  This solves our month problem also. It is straightforward to see that the month group should now be:

```regexp
(0[1-9]|1[0-2])
```

Ok, so we have solved it. Our date regexp is just:

```jsregexp
/^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d\d\d\d$/
```

This looks a little untidy with all those `\d` at the end. Is there any way to tidy that up and say we want exactly 4
digits?

Funny you should ask, let's look at [quantifiers](#quantifiers).

### Quantifiers

A quantifier is a way to we want a certain number of the preceeding expression. The generic version uses curly
braces `{}` which can take up to two numbers separated by a comma. The two numbers represent the minimum number and
maximum number of matches you want for the preceeding part of the expression.

So the four `\d` could be simplified to `\d{4,4}`. A useful shorthand, if the minimum and maximum are the same is to
just put the single number in the braces, so `\d{4}` which is say we want **exactly** for digits. We can use this for
our date regex as follows:

```jsregexp
/^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/
```

If we exclude the second number in the quantifier, but still have the comma, such as `\d{1,}` we are say we want 1 or more digits, but at
least one.

In regexp, there are three shorthand notations that are used commonly:

1. the `*` means `{0,}` - zero or more;
2. the `+` means `{1,}` - one or more; and
3. the `?` means `{0,1}` - zero or one.

If you need to use `*`, `+`, or `?`, as actual characters, just remember to [escape](#character-escapes) them with `\`.

We can use quantifiers to make our regex for date matching a little more flexible in what the user can put in. For
example, the current regex does not match 1/1/21, and would require the user to enter 01/01/2021.

To allow for these options we can use quantifiers as follows:

1. For the days part of the date, leading leading zero could be optional with the `?` quantifier making the group
   expression `(0?[1-9]|[12]\d|3[01])`;
2. For the months part, the same could be said, `(0?[1-9]|1[0-2])`; and
3. The years could be either 2 digits or it must be 4 digits. `(\d{2}|\d{4})`.

Our final regex for data format validation could be:

```jsregexp
/^(0?[1-9]|[12]\d|3[01])\/(0?[1-9]|1[0-2])\/(\d{2}|\d{4})$/
```

Congratulations, we got there.  But this only makes sure the user input is in the right format, not that the date itself is valid.

We are now going to briefly cover two last quick topics in regex and then we are going to tackle extending our regex to
cover [validation](#complex-example) of the date value, not just it's formatting.

### Character Escapes

We have mentioned character escapes above a few times. Using the `\` to preceed a character that has special meaning in
a regex to use the character normally. We have used it for the forward slash `/` ourselves. We need to *escape* the *escape* character `\` to use it as a backslash (e.g `\\`). Other key escapes are the quantifiers above (`*`,`+`,`?`) and the
character class `.`

Finally there are some particular escapes for some whitespace characters, `\t` for tab,  `\n` for linefeed, and `\r` for
carriage return.

### Flags

Flags are things that allow us to extend the use of the regex beyond just one match/validation or change the basic
behaviour of the regex. More than one flag can be used at once.

In javascript, the flags are single letters that a placed after the final `/` of the regex.

1. `g` - *Global* - the regex can be used to search again in the content to find the next match (if any);
2. `m` - *Multiline* - changes how the start `^` and end `$` anchors work. Now they will match the start and end of the
   entire line of content, respectively;
3. `i` - *Case Insensitive* - the search will be case insensitive;
4. `s` - *Dot All* - changes behaviour of the `.` character class, which normally matches all alphabet characters,
   digits, and underscore. It will now also match newline.
5. There are two more, but there use cases are very specific and it is left to the reader to read about them (`u`
   and `y`).

## Complex Example

To test ourselves, before returning to the email validation regex above, let us try something harder, validation of the
date value itself. To accomplish this we will need a more complex regex that covers:

1. Day validation for months that have 31 days;
2. Day validation for months that have 30 days;
3. A look at the special case of February with 28 days, except on leap years.

```
30 days have September, April, June and November, all the rest have 30 days, 
except February which has 28, and 29 each leap year
```

Straight away, we can see we will need [OR](#the-or-operator) for each of these cases.

So for the months 04, 06, 09, and 11 the days can be up to 30. The rest of the months, except, 02, have up to 31. And then
we will tackle February as a special case.

Let us make a specific regex for the 31 day months, which is just a more limited version of our current regex.  We just limit the month group to be the specific months that have 31 days.

```jsregexp
/^(0?[1-9]|[12]\d|31)\/(0?[13578]|1[02])\/(\d{2}|\d{4})$/
```

We do the same for the 30 days months:

```jsregexp
/^(0?[1-9]|[12]\d|30)\/(0?[469]|11])\/(\d{2}|\d{4})$/
```

We can also the same for the 28 day version of February:

```jsregexp
/^(0?[1-9]|1\d|2[0-8])\/02\/(\d{2}|\d{4})$/
```

These are now just large [groups](#grouping-constructs) with an [OR](#the-or-operator) between them to match every day of the year, *EXCEPT* the 29th of Febuary on leap years.

To tackle the leap year condundrum, we need to realise that leap years fall every 4 years, starting from the turn of the
century (e.g. `00`). So we need an expression that matches '00' and every increment by 4, up to 96.

If we look at this list of possible values

```
00, 04, 08, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76, 80, 84, 88, 92, 96.
```

We see a pattern as follows:

1. Starting with 0, and every even digit of the tens value, the final digit can be 0,4, or 8;
2. Every odd digit of the tens value, gives final digits of 2 and 6.

Using what we know of regex we could come up with a first pass for the end of the year value, using the [OR](#the-or-operator) to separate the odd and even tens digit values tests:

```jsregexp
([02468][048]|[13579][26])
```

To a first approximation then, our leap year match can be an exact match on the `29/02` with :

```jsregexp
/^29\/02\/(\d{2})?([02468][048]|[13579][26])$/
```

This expression, while it will work for most cases, is not completely accurate as there is some complexity
with [leap years](https://en.wikipedia.org/wiki/Leap_year), but will work for most modern use cases (i.e. century values divisable by 100 are **not** leap years, unless they are divisible by 400....).

Putting that altogether, our date validation regex will be (formatted for better readability):

```jsregexp
/^((0?[1-9]|[12]\d|31)\/(0?[13578]|1[02])\/(\d{2}|\d{4}) | 
   (0?[1-9]|[12]\d|30)\/(0?[469]|11])\/(\d{2}|\d{4}) | 
   (0?[1-9]|1\d|2[0-8])\/02\/(\d{2}|\d{4}) | 
   (29\/02\/(\d{2})?([02468][048]|[13579][26])))$/
```

If we can tackle something that complex, lets look at the email validation from above.

## Revisiting Email Validation

```regexp
([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})
```

Emails have the form `name@domain.com.au` or something similar.

Let us break this down. There are three [groups](#grouping-constructs), with an `@` between the first two groups, and an
escaped `\.` between groups two and three. The first group must be the name, followed by the `@` separator. The second group
must be the domain, and the third group must be covering the *end of domain* qualifier with a preceeding `.` (e.g. `.com`, `.au`, etc).

The first group is the name:

```jsregexp
[a-z0-9_\.-]+
```

This is using a [bracket](#character-classes-and-bracket-expressions) with an [escaped](#character-escapes) `.`
character, an underscore `_`, a dash `-`, the alphabet and digits 0 to 9 in the bracket. These are the valid characters
in an email name, so that makes sense. We can any number of these characters in any combination, so we need
a [quantifier](#quantifiers) for **at least one** which we have learnt is the `+`.

This group would match `jamie.sharples`, `jamie1-sharples`, `1j2m1e_sha7p1es`, but not `jamie!sharples` as the `!` is
not in the bracket.

The second group is the domain after the `@`:

```jsregexp
[\da-z\.-]+
```

We the same process again, one or more of the set of valid characters for a domain, notably missing the underscore `_`.
This regex group can match more than one domain qualifier, with the inclusion of the [escaped](#character-escapes) `.`,
allowing for `domain.x.y.1` before the end of the email address with the third regex group.

So this group would match `d0main1.te5t.f1uffy.this-i5-10ng` but not `d#main.te&t` as the `#` and `&` are not in the
bracket.  There is a small problem with this regex in that it allows for `....` which is not a valid email address domain.  Ideally we need one other character *before* the `.`.  

This illustrates exactly why we have learnt about Regex **ourselves**.  To be able to see the possible problems and then correct it!

This can be accomplished with a modification to require at least one of the valid characters `[\da-z-]+` and then an optional escaped `.` (`\.?`)  and ensuring that combination is present at least one or more times `+`:

```jsregexp
([\da-z-]+\.?)+
```


Finally we have the end of domain qualifier group:

```jsregexp
[a-z\.]{2,6}
```

We see that domain has tighter limitations on characters to just `a` to `z` and the [escaped](#character-escapes) `.`
with a [quantifier](#quantifiers) to limit to between 2 and 6 characters to finish the email address, allowing
for `.com` and `.au` but not `.fluffybum` which is too long.

Well done for getting to the end of this, and I would recommend heading over to the [further reading](#further-reading-and-learning).

### Further Reading and Learning

I would highly recommend spending some time at [Regexr](https://regexr.com) to learn more about regular expressions.
Using this tool you can create your expression and watch it work on content as you build the expression, with a full
breakdown and explanation of how your regex is being used.

# Questions and Comments

> **Direct your questions and/or comments about this GIST to:**
>
>  *GitHub:* [Github Link](https://github.com/jsharples777)
>
>  *Email:* [jamie.sharples@gmail.com](mailto:jamie.sharples@gmail.com)

## Leap Years

For those of you reading this, like me, who want to know the complete solution for the 29th of February and leap years, lets go a bit further and correct our existing regex.
```jsregexp
/^((0?[1-9]|[12]\d|31)\/(0?[13578]|1[02])\/(\d{2}|\d{4}) | 
   (0?[1-9]|[12]\d|30)\/(0?[469]|11])\/(\d{2}|\d{4}) | 
   (0?[1-9]|1\d|2[0-8])\/02\/(\d{2}|\d{4}) | 
   (29\/02\/(\d{2})?([02468][048]|[13579][26])))$/
```

To actually make the correction work, the year has to be four digits, but can be just two digits for all our other cases (groups).

Essentially, the current expression is wrong for the `00` case in the last group of our expression.  The `0` tens digit should only have the `[48]` options, so let us correct that by adding another [OR](#the-or-operator) option for the `0` case as follows:
```jsregexp
/^((0?[1-9]|[12]\d|31)\/(0?[13578]|1[02])\/(\d{2}|\d{4}) | 
   (0?[1-9]|[12]\d|30)\/(0?[469]|11])\/(\d{2}|\d{4}) | 
   (0?[1-9]|1\d|2[0-8])\/02\/(\d{2}|\d{4}) | 
   (29\/02\/(\d{2})?(0[48]|[2468][048]|[13579][26])))$/
```

Now we need to solve for those century values for which the `00` value is actually a leap year.  Those values are where the year is divisible by 400.  Let us look at the valid centuries and try and find a pattern.
```
0000, 0400, 0800, 1200, 1600, 2000, 2400, 2800, 3200, 3600,....
```

This is a very similar pattern to when we were looking at the tens year values, except now we are looking at the thousands and hundreds places, with a fixed value of 00 at the end:
1. if the thousands is `0` or an even number then 0, 4, or 8 are valid hundreds digits;
2. if the thousands starts with an odd number, then 2 or 6 are valid hundreds digits.

```jsregexp
[02468][048]|[13579][26]00
```

If we create another group for the 29th of February with these options we have a *complete* solution (at least for an AD date value until the year 10k) formatted for better visibility.  To use the regex, make sure the extra white space that was added to format it for display is removed or it will be consider to be part of the pattern!
```jsregexp
/^(
   (0?[1-9]|[12]\d|31)\/(0?[13578]|1[02])\/(\d{2}|\d{4}) | 
   (0?[1-9]|[12]\d|30)\/(0?[469]|11])\/(\d{2}|\d{4}) | 
   (0?[1-9]|1\d|2[0-8])\/02\/(\d{2}|\d{4}) | 
   (29\/02\/(\d{2})?(0[48]|[2468][048]|[13579][26])) |
   (29\/02\/([02468][048]|[13579][26])00) 
   )$/
```
