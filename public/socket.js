(() => {
    $(() => {
        var socket = io();
        $('form').submit(() => {
            socket.emit('chat message', { username: $('#username').val(), text: $('#m').val() });
            $('#m').val('');
            $('#username').val('');
            return false;
        });
        socket.on('chat message', msg => {
            if (msg.text.includes('/setColor')) {
                const color = msg.text.substring(msg.text.indexOf(' ') + 1);
                $(`.${msg.username}`).css('color', color);
            } else if (msg.text.includes('/setBold')) {
                $(`.${msg.username}`).css('font-weight', 'bold');
            }
            else if (msg.text.includes('/setItalic')) {
                $(`.${msg.username}`).css('font-style', 'italic');
            } else if (msg.text.includes('/setBorder')) {
                $(`.${msg.username}`).css('border-with', '1px');
                $(`.${msg.username}`).css('border-style', 'solid');
            } else {
                $('#messages').append($('<div>').text(msg.username + ': ' + msg.text).addClass(msg.username));
            }
        });
    });
})();