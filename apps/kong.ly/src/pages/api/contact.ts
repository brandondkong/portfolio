import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
    const webhookUrl = import.meta.env.DISCORD_WEBHOOK_URL;

    if (!webhookUrl) {
        return new Response(JSON.stringify({ error: 'Server misconfigured' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
        return new Response(
            JSON.stringify({ error: 'All fields are required' }),
            {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            },
        );
    }

    const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            embeds: [
                {
                    title: 'New Contact Submission',
                    color: 0x000000,
                    fields: [
                        { name: 'Name', value: name, inline: true },
                        { name: 'Email', value: email, inline: true },
                        { name: 'Message', value: message },
                    ],
                    timestamp: new Date().toISOString(),
                },
            ],
        }),
    });

    if (!res.ok) {
        return new Response(
            JSON.stringify({ error: 'Failed to send message' }),
            {
                status: 502,
                headers: { 'Content-Type': 'application/json' },
            },
        );
    }

    return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
};
