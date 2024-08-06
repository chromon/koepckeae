import React from 'react'
import { Stack, usePathname } from 'expo-router'
import MoreMenu from './components/MoreMenu'

export default function Layout() {

    const pathname = usePathname();

    const getMoreMenuProps = () => {
        switch (pathname) {
            case '/YearProgress':
                return { navigateTo: '/LifeProgress', title: 'Go to Life Progress' };
            case '/LifeProgress':
                return { navigateTo: '/YearProgress', title: 'Go to Year Progress' };
            default:
                return { navigateTo: '/', title: 'More' };
        }
    };

    return (
        <Stack screenOptions={{
            headerShown: false,
            headerShadowVisible: false,
        }}>
            <Stack.Screen
                name="(pages)/LifeExpectancy"
                options={{
                    title: 'Life Expectancy',
                    headerShown: false,
                    headerShadowVisible: false,
                    gestureEnabled: true,
                }} />
            <Stack.Screen
                name="(pages)/LifeProgress"
                options={{
                    headerBackVisible: false,
                    headerTitle: '',
                    headerShown: true,
                    headerShadowVisible: false,
                    gestureEnabled: true,
                    headerRight: () => <MoreMenu  {...getMoreMenuProps()} />
                }} />
            <Stack.Screen
                name="(pages)/YearProgress"
                options={{
                    headerBackVisible: false,
                    headerTitle: '',
                    headerShown: true,
                    headerShadowVisible: false,
                    gestureEnabled: true,
                    headerRight: () => <MoreMenu  {...getMoreMenuProps()} />
                }} />
            <Stack.Screen
                name="(pages)/Profile"
                options={{
                    title: 'Profile',
                    headerShown: true,
                    headerShadowVisible: false,
                    gestureEnabled: true,
                }} />
        </Stack>
    )
}