import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId: "1006502739031-o88du6rm5lri87gqq81iqena8mjbpl1k.apps.googleusercontent.com",
      clientSecret:"WQzhQraYYzpVpDvXeqrgdek1"
    }),
    // ...add more providers here
  ],

  
})