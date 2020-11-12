<br/>

# Окружение в котором разрабатывалось:

Ubuntu 20.04.01 LTS

<br/>

    $ node --version
    v12.18.4

<br/>

    $ npm --version
    6.14.8

<br/>

    $ cd app/
    $ npm install

<br/>

# Проверки:

<br/>

### Проверка 1

В каталоге src лежит файл plain.txt

<br/>

![Application](/img/check-01-01.png?raw=true)

Выполняем команду:

    $ node src/my_caesar_cli.js --action encode --shift 1 --input plain.txt --output encoded.txt

Смотрим результат кодирования на экране и в файле encoded.txt

<br/>

![Application](/img/check-01-02.png?raw=true)

<br/>

Результаты в файле:

<br/>

![Application](/img/check-01-03.png?raw=true)

<br/>

Запускаем decode:

    $ node src/my_caesar_cli.js --action decode --shift 1 --input encoded.txt --output decoded.txt

<br/>

![Application](/img/check-01-04.png?raw=true)

<br/>

Результаты в файле:

<br/>

![Application](/img/check-01-04.png?raw=true)

<br/>

### Проверка 2 (Аналогичная с другим шагом)

    $ node src/my_caesar_cli.js --action encode --shift 7 --input plain.txt --output encoded.txt

    $ node src/my_caesar_cli.js --action decode --shift 7 --input encoded.txt --output decoded.txt

<br/>

### Проверка 3 (Задан только параметр input, вывод результатов в консоль)

    $ node src/my_caesar_cli.js --action encode --shift 1 --input plain.txt
    $ node src/my_caesar_cli.js --action decode --shift 1 --input plain.txt

<br/>

### Проверка 4 (Строка кодирования задается в консоли, вывод результатов в консоль)

    $ node src/my_caesar_cli.js --action encode --shift 1 Привет: Aa Bb Cc Dd Ee Ff Gg Hh ... Xx Yy Zz.! Конец !!!

<br/>

### Проверка 5

    $ node src/my_caesar_cli.js --action encode --shift 1

<br/>

Появляется сообщение. Нужно набрать желаемый текст в консоли и нажать Enter

![Application](/img/check-05-01.png?raw=true)

<br/>

    $ node src/my_caesar_cli.js --action decode --shift 1

<br/>

### Проверка 6

    $ node src/my_caesar_cli.js --action encode --shift 1 --output encoded.txt

<br/>

Появляется сообщение. Нужно набрать желаемый текст в консоли и нажать Enter

<br/>

![Application](/img/check-06-01.png?raw=true)

В файле encoded.txt должен записаться результат.

<br/>

![Application](/img/check-06-01.png?raw=true)

**Не нужно нажимать Enter с пустой строкой! Данные будут перезаписаны.**

<br/>

![Application](/img/check-06-02.png?raw=true)

<br/>

    $ node src/my_caesar_cli.js --action decode --shift 1 --output decoded.txt

<br/>

### Проверка 7

Удалить файлы encoded.txt и / или decoded.txt и попробовать повыполнять команды. Долны появляться сообщения об отсутствии файлов и останове выполнения программы.

<br/>

# Task 1. Caesar cipher CLI tool

**Implement CLI tool that will encode and decode a text by [Caesar cipher](https://en.wikipedia.org/wiki/Caesar_cipher)**.

CLI tool should accept 4 options (short alias and full name):

1.  **-s, --shift**: a shift
2.  **-i, --input**: an input file
3.  **-o, --output**: an output file
4.  **-a, --action**: an action encode/decode

**Details:**

1. For command-line arguments could be used one of

- [https://www.npmjs.com/package/commander](https://www.npmjs.com/package/commander)
- [https://www.npmjs.com/package/minimist](https://www.npmjs.com/package/minimist)
  or any other module.

2. Action (encode/decode) and the shift are required, if one of them missed - an error should be shown, the process should exit with non-zero status code.
3. If the input file is missed - use stdin as an input source.
4. If the output file is missed - use stdout as an output destination.
5. If the input and/or output file is given but doesn't exist or you can't read it (e.g. because of permissions or it is a directory) - human-friendly error should be printed in stderr.
6. If passed params are fine the output (file or stdout) should contain encoded/decoded content of input (file or stdin).
7. For encoding/decoding use only the English alphabet, all other characters should be kept untouched.

**Hints:**
As suggested solution to make streams code more robust, and memory effective, consider to use [pipeline method](https://nodejs.org/api/stream.html#stream_stream_pipeline_streams_callback).
Structure can be the following:

```javascript
pipeline(
  input_stream, // input file stream or stdin stream
  transform_stream, // standard Transform stream or https://github.com/rvagg/through2
  output_stream // output file stream or stdout stream
)
.then(success and error callbacks)
```

**Usage example:**

```bash
$ node my_caesar_cli -a encode -s 7 -i "./input.txt" -o "./output.txt"
```

```bash
$ node my_caesar_cli --action encode --shift 7 --input plain.txt --output encoded.txt
```

```bash
$ node my_caesar_cli --action decode --shift 7 --input decoded.txt --output plain.txt
```

> input.txt
> `This is secret. Message about "_" symbol!`

> output.txt
> `Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!`

<br/>

---

<br/>

**Marley**

Any questions in english: <a href="https://jsdev.org/chat/">Telegram Chat</a>  
Любые вопросы на русском: <a href="https://jsdev.ru/chat/">Телеграм чат</a>
