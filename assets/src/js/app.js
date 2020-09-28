Vue.use(VueRouter)




let router = new VueRouter({
    routes: [{
        path: '/',
        component: pageHome,
    }, {
        path: '/blog',
        component: pagBlog,
    }, {
        path: '/software',
        component: pageSoftware,
    }, {
        path: '/about',
        component: pageAbout,
    }, {
        path: '/contact',
        component: pageContact,
    }, {
        path: '*',
        redirect: '/'
    }]
})

Vuetify.config.silent = true


// Menuitem component

Vue.component('menu-item', {
    props: ['label', 'path'],
    template: `
    <v-btn :to="path" class="subtitle-1 text-capitalize font-weight-light" text flat>
      {{label}}
    </v-btn>
    `
})

Vue.component('base-frl-footer', {
    template: `
    <div class="pa-8">
        
        <v-footer id="home-footer" min-height="72">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
        <div class="d-flex flex-wrap justify-md-start justify-center">
            <div v-for="(s, i) in social">
            <a :href="s.url" target="_blank" :rel="s.label">
            <v-tooltip top :key="i"  class="pa-1 pa-md-0 mr-4">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on" x-large>
                    
                    <v-icon color="grey lighten-1">
                         {{s.icon}}
                    </v-icon>
                    </v-btn>
                </template>
                <span>{{ s.label}}</span>
            </v-tooltip>
            </a>
               
              </v-responsive>
              </div>
              </div>
        </v-col>

        <v-col
          class="text-center text-md-right"
          cols="12"
          md="6"
        >
          Copyright &copy; {{ new Date().getFullYear() }} FerrusLogic S.A
        </v-col>
        </v-row>
        </v-container>
    </v-footer>
    </div>
    `,
    data: () => ({
        social: [{
                label: 'FerrusLogic in Facebook',
                icon: 'mdi-facebook',
                url: '#'

            },
            {
                label: 'FerrusLogic in GitHub',
                icon: 'mdi-github',
                url: 'https://github.com/Ferruslogic/'
            }
        ],
    }),
})

new Vue({
    el: '#app',
    router,
    vuetify: new Vuetify({
        theme: {
            dark: false
        }

    }),
    data: () => ({
        icons: ['home', 'book', 'briefcase-download', 'account-group', 'contacts'],
        drawer: false,
        appName: "FerrusLogic S.A",
        menuitems: [{
                label: 'Home',
                path: '/'
            },
            {
                label: 'Blog',
                path: '/blog'
            },
            {
                label: 'Projects',
                path: '/software'
            },
            {
                label: 'About',
                path: '/about'
            },
            {
                label: 'Contact',
                path: '/contact'
            },
        ],
        systemDark: false,

    }),
    computed: {
        logoPath: function() {
            if (this.$vuetify.theme.dark) {
                return './assets/public/images/logo-Ferrus-Logic-white.svg';
            }
            return './assets/public/images/logo-Ferrus-Logic.svg';
        },
        imageMenuPath: function() {
            if (this.$vuetify.theme.dark) {
                return './assets/public/images/bg-menu-black.png';
            }
            return './assets/public/images/bg-menu.png';
        },
        darkMode: function() {
            return this.$vuetify.theme.dark;
        },
    },
    template: `
    <div>
    <v-app>

    <div id="top-bar">

                <v-navigation-drawer v-model="drawer" absolute clipped temporary app class="sticky-top">
                    <v-img :aspect-ratio="7/3" :src="imageMenuPath">

                    </v-img>

                    <v-list>
                        <v-list-item :to="{path: '/'}">
                            <v-list-item-action>
                                <v-icon>mdi-{{ icons[0] }}</v-icon>
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-title>Home</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item :to="{path: '/blog'}">
                            <v-list-item-action>
                                <v-icon>mdi-{{ icons[1] }}</v-icon>
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-title>Blog</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item :to="{path: '/software'}">
                            <v-list-item-action>
                                <v-icon>mdi-{{ icons[2] }}</v-icon>
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-title>Projects</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item :to="{path: '/about'}">
                            <v-list-item-action>
                                <v-icon>mdi-{{ icons[3] }}</v-icon>
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-title>About</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item :to="{path: '/contact'}">
                            <v-list-item-action>
                                <v-icon>mdi-{{ icons[4] }}</v-icon>
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-title>Contact</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>

                    <v-spacer></v-spacer>
                </v-navigation-drawer>


                <v-app-bar class="white--text v-sheet v-toolbar v-app-bar v-app-bar--elevate-on-scroll v-app-bar--fixed v-app-bar--hide-shadow" app clipped-left flat>
                  <v-app-bar-nav-icon class="hidden-md-and-up" @click="drawer = !drawer" />

          
                    <v-img class="mx-2" :src="logoPath" max-height="90" max-width="190" contain></v-img>

        
                    <v-spacer></v-spacer>

           
                    <div class="d-none d-md-block mr-3">
                        <menu-item v-for="(menuitem, index) in menuitems" 
                            :key ="index" 
                            :path="menuitem.path" 
                            :label="menuitem.label">
                        </menu-item>
                    </div>



                   
                    <div>
                        <v-tooltip v-if="!darkMode" bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn v-on="on" color="info" small fab
                                    @click="$vuetify.theme.dark = !$vuetify.theme.dark">
                                    <v-icon class="mr-1">mdi-moon-waxing-crescent</v-icon>
                                </v-btn>
                            </template>
                            <span>Dark Mode On</span>
                        </v-tooltip>

                        <v-tooltip v-else bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn v-on="on" color="info" small fab
                                    @click="$vuetify.theme.dark = !$vuetify.theme.dark">
                                    <v-icon color="yellow">mdi-white-balance-sunny</v-icon>
                                </v-btn>
                            </template>
                            <span>Dark Mode Off</span>
                        </v-tooltip>

                    </div>
                  

                </v-app-bar>
            </div>


    <v-main class="v-main v-content">
    <v-container fluid>
        <v-fade-transition mode="out-in">
            <router-view />
        </v-fade-transition>
    </v-container>
    </v-main>

  <base-frl-footer></base-frl-footer>
</v-app>
    </div>
    `
})