import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes: ['/api/webhooks/clerk', '/api/webhooks/stripe'],
    ignoredRoutes: ['/favicon.ico'],
});

export const config = {
    matcher: [
        "/((?!.+.[w]+$|_next).*)",
        "/", "/(api|trpc)(.*)",
        "/favicon.ico"]
    ,
};