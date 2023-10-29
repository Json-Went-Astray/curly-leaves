<template>
    <footer>
        <div class="container">
            <div class="row">

                <div class="col-lg-4 col-md-6">
                    <h3>Szybki dostęp</h3>
                    
                    <div class="d-flex w-100 flex-wrap">
                        <span class="col-12 ms-2 my-1">Strona główna</span>
                        <span class="col-12 ms-2 my-1">Wszystkie produkty</span>
                        <span class="col-12 ms-2 my-1">Kontak</span>
                        <span class="col-12 ms-2 my-1">O nas</span>
                        <span class="col-12 ms-2 my-1">Polityka prywatności</span>
                        <span class="col-12 ms-2 my-1">Pomoc</span>
                    </div>

                    <div class="d-flex socials mt-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z"/></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path d="M15.233 5.488c-.843-.038-1.097-.046-3.233-.046s-2.389.008-3.232.046c-2.17.099-3.181 1.127-3.279 3.279-.039.844-.048 1.097-.048 3.233s.009 2.389.047 3.233c.099 2.148 1.106 3.18 3.279 3.279.843.038 1.097.047 3.233.047 2.137 0 2.39-.008 3.233-.046 2.17-.099 3.18-1.129 3.279-3.279.038-.844.046-1.097.046-3.233s-.008-2.389-.046-3.232c-.099-2.153-1.111-3.182-3.279-3.281zm-3.233 10.62c-2.269 0-4.108-1.839-4.108-4.108 0-2.269 1.84-4.108 4.108-4.108s4.108 1.839 4.108 4.108c0 2.269-1.839 4.108-4.108 4.108zm4.271-7.418c-.53 0-.96-.43-.96-.96s.43-.96.96-.96.96.43.96.96-.43.96-.96.96zm-1.604 3.31c0 1.473-1.194 2.667-2.667 2.667s-2.667-1.194-2.667-2.667c0-1.473 1.194-2.667 2.667-2.667s2.667 1.194 2.667 2.667zm4.333-12h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm.952 15.298c-.132 2.909-1.751 4.521-4.653 4.654-.854.039-1.126.048-3.299.048s-2.444-.009-3.298-.048c-2.908-.133-4.52-1.748-4.654-4.654-.039-.853-.048-1.125-.048-3.298 0-2.172.009-2.445.048-3.298.134-2.908 1.748-4.521 4.654-4.653.854-.04 1.125-.049 3.298-.049s2.445.009 3.299.048c2.908.133 4.523 1.751 4.653 4.653.039.854.048 1.127.048 3.299 0 2.173-.009 2.445-.048 3.298z"/></svg>
                    </div>
                </div>

                <div class="col-lg-4 col-md-6">
                    <h3>Ostatnie wpisy</h3>
                    <div class="mb-2">
                        <div class="d-flex align-items-center">
                            <a href="#" class="pull-left">
                                <img src="http://placehold.co/64x64" alt="" class="media-object" />
                            </a>
                            <h4 class="media-heading ms-4">Nawożenie w zimie</h4>
                        </div>
                            <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span>
                    </div>

                    <div class="mb-2">
                        <div class="d-flex align-items-center">
                            <a href="#" class="pull-left">
                                <img src="http://placehold.co/64x64" alt="" class="media-object" />
                            </a>
                            <h4 class="media-heading ms-4">Nawożenie w zimie</h4>
                        </div>
                            <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span>
                    </div>

                    <div class="mb-2">
                        <div class="d-flex align-items-center">
                            <a href="#" class="pull-left">
                                <img src="http://placehold.co/64x64" alt="" class="media-object" />
                            </a>
                            <h4 class="media-heading ms-4">Nawożenie w zimie</h4>
                        </div>
                            <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span>
                    </div>

                </div>

                <div class="col-lg-4">
                    <h3>Nasze produkty</h3>
                    <img class="img-thumbnail" src="http://placehold.co/150x100" alt="" />
                    <img class="img-thumbnail" src="http://placehold.co/150x100" alt="" />
                    <img class="img-thumbnail" src="http://placehold.co/150x100" alt="" />
                    <img class="img-thumbnail" src="http://placehold.co/150x100" alt="" />
                </div>

            </div>
        </div>
        <div class="py-2 text-center cl-bg-secondary">
            2024 Kacper Boszkiewicz
        </div>
    </footer>
</template>

<script setup lang="ts"></script>

<style scoped>
h4 {
    margin-bottom: 0;
}

footer {
    background: var(--color-primary);
    color: white;
    padding-top: 10px;
}

footer a {
    color: white;
}

footer a:hover {
    color: #fff;
}

footer h3 {
    color: #fff;
    font-weight: bold;
    letter-spacing: 1px;
}

footer .three-column {
    overflow: hidden;
}

footer .three-column li {
    width: 33.3333%;
    float: left;
    padding: 5px 0;
}

.socials > * {
    margin: 0px 10px 0px 10px;
    fill: white;
    cursor: pointer;
}

footer .img-thumbnail {
    background: rgba(0, 0, 0, 0.2);
    border: 1px solid #444;
    margin-bottom: 5px;
}

</style>