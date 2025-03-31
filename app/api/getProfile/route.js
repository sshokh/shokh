import 'dotenv/config'
import axios from 'axios'

const GITHUB_USERNAME = 'sshokh';
const DISCORD_ID = '1002464043665195038';

export async function GET(request) {
    const type = request.nextUrl.searchParams.get("from")

    if (!type) {
        return new Response(
            JSON.stringify({ error: "Missing 'from' parameter" }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
        )
    }

    switch (type) {
        case "discord":
            try {
                const { data } = await axios(
                    `https://discord.com/api/v9/users/${DISCORD_ID}/profile`,
                    { headers: { 'Authorization': process.env.DISCORD_TOKEN } }
                )

                return new Response(JSON.stringify(data), {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' }
                })
            } catch (error) {
                console.error(error)
                return new Response(
                    JSON.stringify({ error }),
                    { status: 500, headers: { 'Content-Type': 'application/json' } }
                )
            }

        case "github":
            try {
                const { data } = await axios.get(`https://api.github.com/users/${GITHUB_USERNAME}/repos`);

                return new Response(JSON.stringify(data), {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' }
                });
            } catch (error) {
                console.error('GitHub API Error:', error.response?.data || error.message);
                return new Response(
                    JSON.stringify({ error: 'Failed to fetch GitHub data' }),
                    { status: 500, headers: { 'Content-Type': 'application/json' } }
                );
            }

        default:
            return new Response(
                JSON.stringify({ error: "Invalid 'from' parameter" }),
                { status: 400 }
            )
    }
}