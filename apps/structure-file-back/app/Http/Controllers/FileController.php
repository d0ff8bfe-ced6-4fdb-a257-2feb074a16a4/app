<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
    // Получить список всех последних версий уникальных файлов
    public function getLastVersions()
    {
        $files = DB::table('file_versions')
            ->select('id', 'file_name', 'file_path', 'project_id', 'version')
            ->whereIn('id', function ($query) {
                $query->select(DB::raw('MAX(id)'))
                    ->from('file_versions')
                    ->groupBy('file_name');
            })
            ->get()
            ->map(function ($file) {
                return [
                    'id' => (string) $file->id,
                    'name' => $file->file_name,
                    'file_path' => route('file:download', ['prj_id' => $file->project_id, 'file_name' => 'v' . $file->version . '_' . $file->file_name]),
                    'path' =>  $file->version,
                ];
            });

        return response(json_encode($files, JSON_UNESCAPED_SLASHES), 200)
            ->header('Content-Type', 'application/json');
    }

    // Получить полную ссылку на .obj файл по имени файла
    public function downloadFile($prj_id, $file_name)
    {
        $path = storage_path('app/files/' . $prj_id . '/' . $file_name);
        if (!file_exists($path)) {
            dd('File not found: ' . $path);
        }
        return response()->download($path);
    }
}
