const _doc = (body) => `<!Doctype html>
                <html>
                    <head>
                        <link rel="stylesheet" href="/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
                        <nav class="navbar navbar-expand-lg navbar-light bg-light">
                            <div class="collapse navbar-collapse" id="navbarNav">
                                <ul class="navbar-nav">
                                    <li class="nav-item">
                                        <a class="nav-link" href="/">Accueil </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="/users">Liste des utilisateurs </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="/users/add">Créer un nouvel utilisateur </a>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </head>
                    <body>
                        ${body}
                    </body>
                </html>`;

module.exports = {
    render: (body) => _doc(body)
}