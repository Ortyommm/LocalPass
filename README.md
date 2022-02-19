# LocalPass - программа для хранения паролей.
LocalPass - password storage software. Supports english language since v1.4.0

### Russian description/Описание на русском:
Как следует из названия, основное преимущество данной программы заключается в хранении паролей локально, так как выгрузка своих паролей на не всегда известный сервер часто вызывает недоверие. Пароли хранятся в зашифрованном виде, поэтому хранение их даже на своем ПК безопасно. 

При каждом входе в программу вас будет встречать окно, которое требует пароль *от самой программы LocalPass*. По этому одному паролю шифруются и дешифруются все занесенные в программу пароли. Пароль от программы можно поменять в любое время.

![image-20211003125314937](https://i.ibb.co/ZYsNT3g/image-20211003123049108.png)

Пароли в программе представлены в виде списка. Можно проводить поиск среди паролей. Пароли можно удалять и редактировать.

![image-20211003125314937](https://i.ibb.co/KD3ZcR4/image-20211003125314937.png)

При нажатии открывается модальное окно:

![image-20211003125504356](https://i.ibb.co/Fn2DwLd/image-20211003125504356.png)

Создание пароля происходит через следующую форму:

![image-20211003123731555](https://i.ibb.co/SNXWpNv/image-20211003123731555.png)

Пример заполнения данной формы:

![image-20211003123926851](https://i.ibb.co/G7BWVrF/image-20211003123926851.png)

Если вы хотите сделать резервную копию всех паролей, то вам следует:

1. Перейти в раздел "Опции".
2. Нажать на "Создать резервную копию". На рабочем столе появится архив.

После для добавления паролей из этого архива в программу, в которой этих паролей нет(например, вы переустановили Windows), сделайте следующее:

1. Перейти в раздел "Опции".
2. Нажать на "Загрузить резервную копию".

Вы также можете переносить отдельные файлы из папки passwords архива в папку passwords программы.

---
Changelog:
### 1.4.1:
- Loading backups feature
- Login input focus on application start
- Changed language name in settings

### 1.4.0:
- English translation
- Little fixes

### 1.3.0:
- Fully rewritten with Vue.js
- Electron 12
- Disabled dark theme

### 1.2.2:
- Last pure js version
