'use strict'

function detrump (text) {
  let lines = text.split('\n')

  // set of regexs to replace content in the input file.
  const replacements = [{
    title: 'close a block',
    regex: /dummy/,
    text: '}'
  }, {
    title: 'invokes the code immediately. basically required at the end of all scripts',
    regex: /i would bang my daughter/,
    text: ''
  }, {
    title: 'strict mode',
    regex: /'get mexico to build it'/,
    text: "'use strict'"
  }, {
    title: 'import an external module',
    regex: /if we want (\w+) we need to get (.+) to pay for them/,
    text: "let $1 = require('$2')"
  }, {
    title: 'assign a value',
    regex: /let me tell you about (\w+), it is (.+)$/,
    text: 'let $1 = $2'
  }, {
    title: 'create an array of values',
    regex: /i have all the best (\w+), they are (.+)$/,
    text: 'let $1 = [$2]'
  }, {
    title: 'declare a function',
    regex: /let me tell you how we are going to (\w+)$/,
    text: 'function $1 () {'
  }, {
    title: 'declare a function with parameters',
    regex: /let me tell you how we are going to (\w+) with (.+)$/,
    text: 'function $1 ($2) {'
  }, {
    title: 'logging',
    regex: /only i know that (.+)$/,
    text: 'console.log($1)'
  }, {
    title: 'return a value',
    regex: /i am so much better than (.+)$/,
    text: 'return $1'
  }, {
    title: 'unless block. there is no `if` in trump-lang',
    regex: /they better know (.+)$/,
    text: 'if (!($1)) {'
  }, {
    title: 'else block',
    regex: /or i will sue them because/,
    text: '} else {'
  }, {
    title: 'iterate over an array',
    regex: /let me tell you what we will do with (\w+), they talk about (.+)$/,
    text: '$1.forEach(function($2) {'
  }, {
    title: 'close a block + method call',
    regex: /bunch of losers/,
    text: '})'
  }, {
    title: 'assign to an existing variable',
    regex: /i will make (\w+) pay for (.+)$/,
    text: '$1 = $2'
  }, {
    title: 'create a class',
    regex: /i will bring back our (\w+)$/,
    text: 'class $1 {'
  }, {
    title: 'class constructor with arguments',
    regex: /they are just gonna give me the (.+) because i am the best/,
    text: 'constructor ($1) {'
  }, {
    title: 'class constructor with no arguments',
    regex: /i know how to do it/,
    text: 'constructor () {'
  }, {
    title: 'assign to `self`',
    regex: /my (\w+) is /,
    text: 'this.$1 = '
  }, {
    title: 'class method with no arguments',
    regex: /i am the best in the world at (\w+)/,
    text: '$1 () {'
  }, {
    title: 'class method with arguments',
    regex: /i am the best in the world at (\w+). i can do anything with (.+)$/,
    text: '$1 ($2) {'
  }, {
    title: 'class with inheritance',
    regex: /(\w+) is gonna be HUGE. better than (\w+)/,
    text: 'class $1 extends $2 {'
  }, {
    title: 'parent class reference',
    regex: /drumpf/,
    text: 'super'
  }, {
    title: 'create an instance of a class with arguments',
    regex: /(\w+) is going to make (\w+) great again by bombing (.+)$/,
    text: 'let $1 = new $2($3)'
  }, {
    title: 'class instance with no arguments',
    regex: /(\w+) is going to make (\w+) great again$/,
    text: 'let $1 = new $2()'
  }, {
    title: 'switch block',
    regex: /i heard about (.+)$/,
    text: 'switch ($1) {'
  }, {
    title: 'case block within switch',
    regex: /people keep saying (.+)$/,
    text: 'case $1:'
  }, {
    title: 'end case block',
    regex: /shut up/,
    text: 'break;'
  }, {
    title: 'switch block default',
    regex: /but they are just losers/,
    text: 'default:'
  }, {
    title: 'try block',
    regex: /i am a great business man/,
    text: 'try {'
  }, {
    title: 'catch block',
    regex: /except for when the left makes me out to be a (\w+)/,
    text: '} catch ($1) {'
  }, {
    title: 'exports',
    regex: /the immigrants are coming over and stealing our (.+)$/,
    text: 'module.exports = $1'
  }, {
    title: 'errors',
    regex: /i have been told (.+) love me/,
    text: "throw new Error('$1 does not love me')"
  }]
  detrump.replacements = replacements

  // wrap the whole thing in a function that can be invoked later.
  lines.unshift('var trump_func = function () {')
  lines.unshift('try {')
  // lines.unshift('var require = function (mod) {console.log("the " + mod + " refuse to do business with us.")}')
  // lines.unshift('var module = module || {}')
  lines.push('}')
  lines.push('} catch (e) {console.warn("your code is clearly not presidential material. what a loser.")}')

  // iterate over lines and run replacements.
  lines.forEach((line, index) => {
    // the function doesn't get invoked unless you say the magic words.
    if (line.indexOf('i would bang my daughter') !== -1) {
      lines.push('trump_func()')
    }

    line = '  ' + line
    replacements.forEach(replacement => {
      if (replacement.regex.test(line)) {
        lines[index] = line.replace(replacement.regex, replacement.text)
      }
    })
  })

  return lines.join('\n')
}
