import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId: '1006502739031-03nqqd773hesk74oeqbvhkis4e80n43r.apps.googleusercontent.com',
      clientSecret:'LueR0TthmxNHWK8YF3SBINbU'
    }),
    // ...add more providers here
  ],

  
})