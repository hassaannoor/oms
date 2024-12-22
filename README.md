## Getting Started

First, clone the repo:
```bash
git clone https://github.com/hassaannoor/oms
```

Then, add the .env file:
```
DATABASE_URL="postgresql://yourusername:yourpassword@your-db-host:5432/postgres" 
NEXTAUTH_URL=http://localhost:3000/
```

Then, generate the prisma client:
```bash
npx prisma generate
```
In some cases, you might get blocked by network firewalls. A workaround would be to use cloudflare WARP.

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Todo
- [x] Implement Auth
- [x] If you're logged in auto redirect /login to /dashboard
- [ ] Stop showing IDs, instead create links that go to the related entry page
