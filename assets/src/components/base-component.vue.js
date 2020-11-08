/* Menu */
Vue.component('base-menu', {
    template: `
        <div>
            <div class="d-none d-md-block mr-3">
                <v-btn class="subtitle-1 text-capitalize font-weight mx-1"
                text flat v-for="(menuitem, index) in menuItems"
                :key ="index"
                :to="menuitem.path">
                    {{ menuitem.label }}
                </v-btn>

                <changer-language />
            </div>
        </div> `,
    computed: {
        menuItems: function() {
            return this.$store.state.language.texts.menuItems;
        }
    }
});


/**Button changer language */
Vue.component('changer-language', {
    template: `
    <v-btn  outlined color="success"  @click="onClick">
        <v-icon left>mdi-google-translate</v-icon> {{languageActive}}
    </v-btn>
    `,
    methods: {
        onClick: function() {
            changerLanguage();
        }
    },
    computed: {
        languageActive: function() {
            return this.$store.state.language.active;
        }
    }

});

/* Drawer of app */
Vue.component('base-drawer', {
    template: `
        <div  class="sticky-top" style="max-width: 256px;min-width: 200px;width: 75%;">
            <v-navigation-drawer left fixed temporary d-flex align-stretch overlay-color="secondary"
                overlay-opacity=".8"
                v-bind="$attrs"
                v-on="$listeners"
                clipped app >
                    <v-img :aspect-ratio="7/3" :src="imageMenuPath" />
                        <v-list shaped>
                            <v-list-item v-for="(item, index) in menuItems"
                            :key="index"
                            :to="item.path">
                                <v-list-item-action>
                                    <v-icon>mdi-{{ icons[index] }}</v-icon>
                                </v-list-item-action>
                                <v-list-item-content>
                                    <v-list-item-title>{{ item.label }}</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                        <v-spacer></v-spacer>
                        <v-divider></v-divider>
                        <changer-language style="width: 95%;margin: 2%;"/>

            </v-navigation-drawer>
        </div> `,
    computed: {
        imageMenuPath: function() {
            if (this.$vuetify.theme.dark) {
                return './assets/public/images/bg-menu-black.png';
            }
            return './assets/public/images/bg-menu.png';
        },
        menuItems: function() {
            return this.$store.state.language.texts.menuItems;
        }
    },
    data: () => ({
        icons: [
            'home',
            'book',
            'briefcase',
            'account-group',
            'contacts'
        ],
    }),
});

/* Button changer to dark mode */
Vue.component('btn-dark-mode', {
    template: `
        <div>
            <v-tooltip v-if="!$vuetify.theme.dark" bottom>
                <template v-slot:activator="{ on }">
                    <v-btn v-on="on" color="info" icon raised rounded @click="onClick">
                        <v-icon class="mr-1">mdi-moon-waxing-crescent</v-icon>
                    </v-btn>
                </template> <span>{{ darkModeOn }}</span>
                </v-tooltip>
                <v-tooltip v-else bottom>

                <template v-slot:activator="{ on }">
                    <v-btn v-on="on" color="info"  icon raised rounded @click="onClick">
                        <v-icon color="yellow">mdi-white-balance-sunny</v-icon>
                    </v-btn>
                </template> <span> {{ darkModeOff }}</span>
                </v-tooltip>
        </div> `,
    methods: {
        onClick: function() {
            this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
            if (this.$vuetify.theme.dark) {
                window.localStorage.setItem('darkActive', "1");
            } else {
                window.localStorage.setItem('darkActive', "0");
            };
        }
    },
    computed: {
        darkModeOn: function() {
            return this.$store.state.language.texts.darkModeOn;
        },
        darkModeOff: function() {
            return this.$store.state.language.texts.darkModeOff;
        }
    }
});

/*  App top bar */
Vue.component('base-app-top-bar', {
    template: `
        <div>
            <div id="top-bar">
                <v-app-bar elevate-on-scroll class="overflow-y-auto v-app-bar--fixed "
                    style="z-index: 1008;">
                    <v-app-bar-nav-icon class="hidden-md-and-up" @click="drawer = !drawer" />
                        <router-link to="/">
                            <v-img class="mx-2" :src="logoPath"  max-height="90" max-width="190" contain />
                        </router-link>
                    <v-spacer></v-spacer>
                    <base-menu />
                    <btn-dark-mode class="d-none d-md-block"/>
                    </v-app-bar>
            </div>

            <base-drawer v-model="drawer" id="base-drawer-mobile" />

        </div> `,
    data: () => ({
        drawer: null
    }),
    computed: {
        logoPath: function() {
            if (this.$vuetify.theme.dark) {
                return './assets/public/images/logo-Ferrus-Logic-white.svg';
            }
            return './assets/public/images/logo-Ferrus-Logic.svg';
        }
    }
});

/* Footer of app */
Vue.component('base-footer', {
    store,
    template: `
        <div>


            <v-footer id="home-footer" min-height="72" d-block pa-2>
                <v-container>
                    <v-row>
                        <v-col cols="12" md="6">
                            <div class="d-flex flex-wrap justify-md-start justify-center">
                                <div v-for="(s, i) in social">
                                    <a :href="s.url" target="_blank" :rel="s.label">
                                        <v-tooltip top :key="i"
                                        class="pa-1 pa-md-0 mr-4">

                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn class="mx-1" icon v-bind="attrs" v-on="on" x-large>
                                                <v-icon color="grey lighten-1"> {{s.icon}} </v-icon>
                                                </v-btn>
                                                <slot/>
                                                <v-spacer></v-spacer><v-spacer></v-spacer>
                                        </template>
                                        <span> {{toFollowIn}}  {{ s.label}}</span>
                                        <v-spacer></v-spacer>
                                        </v-tooltip>
                                    </a>
                                </div>
                            </div>
                        </v-col>

                        <v-col class="text-center text-md-right" cols="12" md="6" >
                            Copyright &copy; {{ new Date().getFullYear() }}, {{ appName }}
                        </v-col>
                    </v-row>
                </v-container>
            </v-footer>
        </div> `,
    data: () => ({
        social: [{
            label: 'Facebook',
            icon: 'mdi-facebook',
            url: '#'
        }, {
            label: 'GitHub',
            icon: 'mdi-github',
            url: 'https://github.com/Ferruslogic/'
        }],
    }),
    computed: {
        appName: function() {
            return this.$store.state.language.texts.appName;
        },
        toFollowIn: function() {
            return this.$store.state.language.texts.toFollowIn;
        }
    }
});


Vue.component('base-grid-post', {
    template: `
        <div>
            <v-card class="mx-auto" max-width="344" outline >
                <v-img :src="thumbnail" height="200px"></v-img>
                <v-card-title> {{title}} </v-card-title>
                <v-card-subtitle> {{subtitle}} </v-card-subtitle>
            <v-card-actions>

            <router-link :to="postLink">
                <v-btn class="orange--text" text> {{ readMore }} </v-btn>
            </router-link>

            <v-spacer></v-spacer>

            <v-btn icon @click="show = !show">
                <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>

            </v-card-actions>

            <v-expand-transition>
                <div v-show="show">
                    <v-divider></v-divider>
                    <v-card-text> {{ content }} </v-card-text>
                </div>
            </v-expand-transition>
            </v-card>
            </div> `,
    data: () => ({
        show: false
    }),
    props: {
        title: String,
        content: String,
        thumbnail: String,
        postLink: String,
        subtitle: String,
        postFolder: String
    },
    computed: {
        readMore: function() {
            return this.$store.state.language.texts.readMore;
        }
    }
});

Vue.component('base-page-title', {
    template: `
    <div class="container text-center">
        <h2 class="display-2 font-weight-bold mb-3"> {{ title }}</h2>
        <base-separator />
    </div>
    `,
    props: {
        title: {
            type: String,
            default: "Page title"
        }
    },
});

Vue.component('base-separator', {
    template: `
    <div>
        <div class="v-responsive mx-auto mb-8" style="width: 56px;">
            <div class="v-responsive__content">
                <hr role="separator" aria-orientation="horizontal" class="mb-1 v-divider theme--light">
                <hr role="separator" aria-orientation="horizontal" class="v-divider theme--light">
            </div>
        </div>
    </div>
    `
})

Vue.component('base-grid-product', {
    template: `
    <div>
    <v-hover>
        <v-card
        slot-scope="{ hover }"
        class="mx-auto"
        color="grey lighten-4"
        max-width="600"
        >
        <v-img
            :aspect-ratio="16/9"
            :src="imageURL"
        >
        <v-expand-transition>
        <div
            v-if="hover"
            class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal display-3 white--text"
            style="height: 100%;"
        >
            $ {{price}}
        </div>
        </v-expand-transition>
    </v-img>

    <v-card-text
        class="pt-4"
        style="position: relative;"
    >


    <div class="font-weight-light grey--text title mb-2">
        {{ softwareTag }}
    </div>

    <h3 class="display-1 font-weight-light orange--text mb-2">
        {{ softwareName }}
    </h3>

    <div class="font-weight-light grey--text  title mb-2">
        {{ description }}
    </div>

    </v-card-text>

    <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn icon :href="documentLink" target="_blank">
            <v-icon style="color: #ff7800;">mdi-file-document</v-icon>
        </v-btn>

        <v-btn icon :href="codeLink" target="_blank">
                <v-icon style="color: #ff7800;">mdi-github</v-icon>
        </v-btn>

    <v-btn icon :href="downloadLink" target="_blank">
                <v-icon style="color: #ff7800;">mdi-archive-arrow-down</v-icon>
    </v-btn>

    </v-card-actions>
    </v-card>
    </v-hover>
    </div>
    `,

    props: {
        imageURL: {
            type: String,
            default: "https://picsum.photos/350/165?random"
        },
        price: {
            type: String,
            default: "00.00"
        },
        description: {
            type: String,
            default: "description"
        },
        softwareTag: {
            type: String,
            default: "software-Tag"
        },
        softwareName: {
            type: String,
            default: "software-Name"
        },
        downloadLink: {
            type: String,
            default: "#"
        },
        codeLink: {
            type: String,
            default: "#"
        },
        documentLink: {
            type: String,
            default: "#"
        }
    }
});