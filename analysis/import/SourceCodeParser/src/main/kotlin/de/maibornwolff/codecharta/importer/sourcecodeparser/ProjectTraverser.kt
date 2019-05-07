package de.maibornwolff.codecharta.importer.sourcecodeparser

import org.sonar.api.internal.apachecommons.io.FilenameUtils
import org.sonar.api.internal.apachecommons.io.filefilter.FileFilterUtils
import org.sonar.api.internal.apachecommons.io.filefilter.IOFileFilter
import java.io.File
import java.io.FileFilter
import java.nio.file.Paths
import java.util.ArrayList
import java.util.HashMap

class ProjectTraverser(var root: File, private val exclude: Array<String> = arrayOf()) {
    private var fileList: MutableList<File> = mutableListOf()
    private val analyzerFileLists: MutableMap<String, MutableList<String>>? = HashMap()

    fun traverse() {
        val excludePatterns = exclude.joinToString(separator = "|", prefix = "(", postfix = ")").toRegex()

        File(root.toString()).walk().forEach {
            val standardizedPath = "/" + getRelativeFile(it.toString())
            if(it.isFile && !(exclude.isNotEmpty() && excludePatterns.containsMatchIn(standardizedPath))){
                fileList.add(it)
            }
        }

        adjustRootFolderIfRootIsFile()
        assignFilesToAnalyzers()
    }

    private fun assignFilesToAnalyzers() {
        for (file in this.fileList) {
            val fileName = getRelativeFile(file.toString())
            val fileExtension = FilenameUtils.getExtension(fileName)

            if (!this.analyzerFileLists!!.containsKey(fileExtension)) {
                val fileListForType: MutableList<String> = mutableListOf()
                fileListForType.add(fileName)
                this.analyzerFileLists[fileExtension] = fileListForType
            } else {
                this.analyzerFileLists[fileExtension]!!.add(fileName)
            }
        }
    }

    fun getFileListByExtension(type: String): List<String> {
        return if (this.analyzerFileLists!!.containsKey(type)) {
            this.analyzerFileLists[type] ?: listOf()
        } else {
            ArrayList()
        }
    }

    private fun getRelativeFile(fileName: String): String {

        return root.toPath()
                .relativize(Paths.get(fileName))
                .toString()
                .replace('\\', '/')
    }

    private fun adjustRootFolderIfRootIsFile() {
        if(fileList.size == 1 && fileList[0] == root){
            root = root.parentFile
        }
    }
}