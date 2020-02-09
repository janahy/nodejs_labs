
const _doc = (body) => `<!Doctype html>
                <html>
                    <head>
                        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
                        <nav class="navbar navbar-expand-lg navbar-light bg-light">
                            <div class="collapse navbar-collapse" id="navbarNav">
                                <ul class="navbar-nav">
                                    <li class="nav-item active">
                                        <a class="nav-link" href="/users">Liste des utilisateurs <span class="sr-only">(current)</span></a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="/add-user">Créer un nouvel utilisateur </a>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </head>
                    <body>
                        ${body}
                    </body>
                </html>`;

const _dt = (users) => {
    let tbody = '';
    users.get().map( user => {
            tbody += `<tr>
                        <td>${user.name}</td>
                        <td>${user.age}</td>
                        <td>${user.profession}</td>
                    </tr>`
    });
    return _doc(
        `<table class="table">
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Age</th>
                    <th>Profession</th>
                </tr>
            </thead>
            <tbody>
                ${tbody}
            </tbody>
        </table>`
    )
    ;
}

module.exports = {
    renderForm: () => _doc(`<form action='/users' method='POST'>
                        <input type='text' placeholder='name' name='name'>
                        <input type='text' placeholder='age' name='age'>
                        <input type='text' placeholder='profession' name='profession'>
                        <button type='submit'>Sauvegarder</button>
                    </form>`),
    renderDt: (entries) => _dt(entries)
}