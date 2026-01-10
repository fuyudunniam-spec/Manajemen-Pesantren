'use client';

import { useState } from 'react';
import { Input } from './input';
import { Label } from './label';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Button } from './button';
import { Pipette } from 'lucide-react';

interface ColorPickerProps {
    value: string;
    onChange: (value: string) => void;
    label?: string;
    presets?: string[];
}

export function ColorPicker({ value, onChange, label, presets }: ColorPickerProps) {
    const [localValue, setLocalValue] = useState(value);

    const defaultPresets = [
        '#059669', // emerald-600
        '#0f766e', // teal-700
        '#d97706', // amber-600
        '#dc2626', // red-600
        '#7c3aed', // violet-600
        '#0891b2', // cyan-600
        '#ea580c', // orange-600
        '#65a30d', // lime-600
    ];

    const colorPresets = presets || defaultPresets;

    return (
        <div className="space-y-2">
            {label && <Label>{label}</Label>}
            <div className="flex gap-2">
                <div className="flex-1">
                    <Input
                        type="text"
                        value={localValue}
                        onChange={(e) => {
                            setLocalValue(e.target.value);
                            onChange(e.target.value);
                        }}
                        placeholder="#059669"
                        className="font-mono"
                    />
                </div>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="shrink-0"
                            style={{ backgroundColor: localValue }}
                        >
                            <Pipette className="w-4 h-4" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-64">
                        <div className="space-y-3">
                            <div>
                                <Label className="text-xs text-muted-foreground">
                                    Color Picker
                                </Label>
                                <input
                                    type="color"
                                    value={localValue}
                                    onChange={(e) => {
                                        setLocalValue(e.target.value);
                                        onChange(e.target.value);
                                    }}
                                    className="w-full h-10 rounded border cursor-pointer"
                                />
                            </div>
                            <div>
                                <Label className="text-xs text-muted-foreground mb-2 block">
                                    Presets
                                </Label>
                                <div className="grid grid-cols-8 gap-2">
                                    {colorPresets.map((preset) => (
                                        <button
                                            key={preset}
                                            type="button"
                                            onClick={() => {
                                                setLocalValue(preset);
                                                onChange(preset);
                                            }}
                                            className="w-8 h-8 rounded border-2 border-border hover:border-primary transition-colors"
                                            style={{ backgroundColor: preset }}
                                            title={preset}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
}
