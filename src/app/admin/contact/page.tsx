'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Loading from '@/src/app/loading';

interface ContactItem {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    isProcessed: boolean;
    createdAt: string;
}

export default function AdminContactPage() {
    const [contacts, setContacts] = useState<ContactItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedContact, setSelectedContact] = useState<ContactItem | null>(null);

    const [replyMessage, setReplyMessage] = useState('');
    const [isReplying, setIsReplying] = useState(false);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const res = await fetch('/api/admin/contact');
                const result = await res.json();
                if (res.ok && result.success) {
                    setContacts(result.data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchContacts();
    }, []);

    // 낙관적 업데이트를 적용하여 즉시 반응하는 처리 상태 변경 핸들러
    const toggleStatus = async (id: string, currentStatus: boolean) => {
        const nextStatus = !currentStatus;

        setContacts((prev) => prev.map((item) => (item.id === id ? { ...item, isProcessed: nextStatus } : item)));
        if (selectedContact && selectedContact.id === id) {
            setSelectedContact((prev) => (prev ? { ...prev, isProcessed: nextStatus } : null));
        }

        try {
            const res = await fetch('/api/admin/contact', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, isProcessed: nextStatus }),
            });

            if (!res.ok) {
                throw new Error('네트워크 서버 에러');
            }
        } catch (error) {
            alert('상태 업데이트에 실패했습니다. 이전 상태로 되돌립니다.');
            setContacts((prev) =>
                prev.map((item) => (item.id === id ? { ...item, isProcessed: currentStatus } : item)),
            );
            if (selectedContact && selectedContact.id === id) {
                setSelectedContact((prev) => (prev ? { ...prev, isProcessed: currentStatus } : null));
            }
        }
    };

    // 메일 발송 핸들러
    const sendReply = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedContact || !replyMessage.trim()) return;

        setIsReplying(true);
        try {
            const res = await fetch('/api/admin/contact/reply', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: selectedContact.id,
                    email: selectedContact.email,
                    subject: `[답변] ${selectedContact.subject}`,
                    replyMessage: replyMessage,
                }),
            });

            const result = await res.json();

            if (res.ok && result.success) {
                alert('답변 이메일이 성공적으로 전송되었습니다.');
                setReplyMessage('');

                if (!selectedContact.isProcessed) {
                    toggleStatus(selectedContact.id, false);
                }
                setSelectedContact(null);
            } else {
                alert(result.error || '답변 발송에 실패했습니다.');
            }
        } catch (error) {
            console.error(error);
            alert('오류가 발생했습니다. 다시 시도해 주세요.');
        } finally {
            setIsReplying(false);
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-8 md:px-8 md:py-16 dark:bg-slate-950">
            <div className="mx-auto max-w-5xl">
                <header className="mb-10 flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-center dark:border-slate-800">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
                            문의 내용 관리
                        </h1>
                        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                            총 <span className="font-semibold text-blue-600 dark:text-blue-400">{contacts.length}</span>
                            건의 문의 내역을 모니터링하고 처리 상태를 관리합니다.
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        <Link
                            href="/admin"
                            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-500 dark:bg-blue-500 dark:hover:bg-blue-400"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2.5}
                                stroke="currentColor"
                                className="h-4 w-4"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                            관리자 홈으로 이동
                        </Link>
                    </div>
                </header>

                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="overflow-x-auto">
                        {/* 💡 text-left 제거 후 기본 또는 text-center 구조 확보 */}
                        <table className="w-full border-collapse text-sm">
                            <thead className="bg-slate-50 text-xs font-semibold text-slate-700 dark:bg-slate-950 dark:text-slate-300">
                                <tr>
                                    {/* 💡 헤더 열들에 text-center 추가 */}
                                    <th className="px-4 py-3 text-center md:px-6">상태</th>
                                    <th className="px-4 py-3 text-center md:px-6">이름</th>
                                    <th className="px-4 py-3 text-center md:px-6">이메일</th>
                                    <th className="px-4 py-3 text-center md:px-6">제목</th>
                                    <th className="hidden px-4 py-3 text-center md:table-cell md:px-6">등록일시</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {contacts.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="py-12 text-center text-slate-400">
                                            접수된 문의 내역이 없습니다.
                                        </td>
                                    </tr>
                                ) : (
                                    contacts.map((item) => (
                                        <tr
                                            key={item.id}
                                            onClick={() => {
                                                setSelectedContact(item);
                                                setReplyMessage('');
                                            }}
                                            className="cursor-pointer transition hover:bg-slate-50/50 dark:hover:bg-slate-800/30"
                                        >
                                            {/* 💡 본문 데이터 셀들에도 text-center를 부여하여 열 밸런스를 맞춤 */}
                                            <td className="px-4 py-4 text-center whitespace-nowrap md:px-6">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        toggleStatus(item.id, item.isProcessed);
                                                    }}
                                                    className={`rounded-full border-2 px-2.5 py-1 text-xs font-bold transition-all ${
                                                        item.isProcessed
                                                            ? 'border-green-200 bg-green-50 text-green-700 dark:border-green-900/50 dark:bg-green-950/30 dark:text-green-400'
                                                            : 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-400'
                                                    }`}
                                                >
                                                    {item.isProcessed ? '완료' : '대기'}
                                                </button>
                                            </td>
                                            <td className="px-4 py-4 text-center font-semibold text-slate-800 md:px-6 dark:text-slate-200">
                                                {item.name}
                                            </td>
                                            <td className="px-4 py-4 text-center font-medium text-slate-600 md:px-6 dark:text-slate-400">
                                                {item.email}
                                            </td>
                                            <td className="px-4 py-4 md:px-6">
                                                {/* 제목은 가운뎃줄 정렬 시 텍스트 밸런스를 위해 flex justify-center 구조 할당 */}
                                                <div className="flex justify-center">
                                                    <div className="max-w-[180px] truncate font-semibold text-slate-900 md:max-w-xs dark:text-slate-50">
                                                        {item.subject}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="hidden px-4 py-4 text-center text-xs whitespace-nowrap text-slate-500 md:table-cell md:px-6 dark:text-slate-400">
                                                {new Date(item.createdAt).toLocaleString('ko-KR', {
                                                    dateStyle: 'short',
                                                    timeStyle: 'short',
                                                })}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {selectedContact && (
                <div
                    className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm dark:bg-slate-950/60"
                    onClick={() => setSelectedContact(null)}
                >
                    <div
                        className="w-full max-w-2xl rounded-xl border border-slate-200 bg-white p-6 shadow-xl transition-all dark:border-slate-800 dark:bg-slate-900"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-start justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
                            <div>
                                <span
                                    className={`inline-block rounded-full border px-2 py-0.5 text-[11px] font-bold ${
                                        selectedContact.isProcessed
                                            ? 'border-green-200 bg-green-50 text-green-700 dark:border-green-900/30 dark:bg-green-950/20'
                                            : 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/30 dark:bg-amber-950/20'
                                    }`}
                                >
                                    {selectedContact.isProcessed ? '처리 완료' : '답변 대기'}
                                </span>
                                <h2 className="mt-1.5 text-base font-bold text-slate-900 dark:text-slate-50">
                                    {selectedContact.subject}
                                </h2>
                            </div>
                            <button
                                onClick={() => setSelectedContact(null)}
                                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="h-5 w-5"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="my-4 grid grid-cols-2 gap-2 rounded-lg bg-slate-50 p-3 text-xs text-slate-600 dark:bg-slate-950/50 dark:text-slate-400">
                            <div>
                                • <strong>작성자:</strong> {selectedContact.name}
                            </div>
                            <div>
                                • <strong>이메일:</strong>{' '}
                                <a href={`mailto:${selectedContact.email}`} className="text-blue-500 underline">
                                    {selectedContact.email}
                                </a>
                            </div>
                            <div className="col-span-2">
                                • <strong>접수일시:</strong>{' '}
                                {new Date(selectedContact.createdAt).toLocaleString('ko-KR')}
                            </div>
                        </div>

                        <div className="max-h-40 overflow-y-auto rounded-lg border border-slate-100 bg-slate-50/50 p-4 text-sm leading-relaxed text-slate-700 dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-300">
                            <p className="whitespace-pre-wrap">{selectedContact.message}</p>
                        </div>

                        <form
                            onSubmit={sendReply}
                            className="mt-5 border-t border-slate-100 pt-4 dark:border-slate-800"
                        >
                            <label
                                htmlFor="reply"
                                className="mb-2 block text-xs font-bold text-slate-700 dark:text-slate-300"
                            >
                                ✉️ 이메일 답변 보내기
                            </label>
                            <textarea
                                id="reply"
                                rows={4}
                                required
                                value={replyMessage}
                                onChange={(e) => setReplyMessage(e.target.value)}
                                placeholder="회신할 이메일 답변 내용을 입력해주세요. 전송 버튼을 누르면 해당 유저의 이메일로 발송됩니다."
                                className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 transition outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:focus:border-slate-600 dark:focus:ring-slate-600"
                            />

                            <div className="mt-2 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={isReplying || !replyMessage.trim()}
                                    className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="h-3.5 w-3.5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                                        />
                                    </svg>
                                    {isReplying ? '메일 전송 중...' : '답변 발송'}
                                </button>
                            </div>
                        </form>

                        <div className="mt-4 flex justify-between gap-2 border-t border-slate-100 pt-3 dark:border-slate-800">
                            <button
                                onClick={() => toggleStatus(selectedContact.id, selectedContact.isProcessed)}
                                className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                            >
                                {selectedContact.isProcessed ? '대기 상태로 돌리기' : '검토 완료(메일 안 보냄)'}
                            </button>
                            <button
                                onClick={() => setSelectedContact(null)}
                                className="rounded-lg bg-slate-900 px-4 py-1.5 text-xs font-semibold text-white hover:bg-slate-800 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-200"
                            >
                                닫기
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
