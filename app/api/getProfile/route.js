import 'dotenv/config'
import axios from 'axios'

const RIOT_ID = 'optifire'; // Your Riot ID
const TAGLINE = 'socks';
const GITHUB_USERNAME = 'sshokh';

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
                const { data } = await axios.get(
                    'https://discord.com/api/v9/users/1002464043665195038/profile',
                    { headers: { 'Authorization': process.env.DISCORD_TOKEN } }
                )

                return new Response(JSON.stringify(data), {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' }
                })
            } catch (error) {
                console.error(error)
                return new Response(
                    JSON.stringify({ error: error.message }),
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