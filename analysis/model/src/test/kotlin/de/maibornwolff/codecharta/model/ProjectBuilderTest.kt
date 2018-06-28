/*
 * Copyright (c) 2017, MaibornWolff GmbH
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  * Redistributions of source code must retain the above copyright notice,
 *    this list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 *  * Neither the name of  nor the names of its contributors may be used to
 *    endorse or promote products derived from this software without specific
 *    prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

package de.maibornwolff.codecharta.model

import org.hamcrest.MatcherAssert.assertThat
import org.hamcrest.Matchers
import org.hamcrest.Matchers.`is`
import org.hamcrest.Matchers.hasSize
import org.jetbrains.spek.api.Spek
import org.jetbrains.spek.api.dsl.describe
import org.jetbrains.spek.api.dsl.it
import org.jetbrains.spek.api.dsl.on

class ProjectBuilderTest : Spek({

    describe("ProjectBuilder without root node") {
        val projectBuilder = ProjectBuilder("someName")

        on("inserting new node") {
            val nodeForInsertion = MutableNode("someNode", NodeType.File)
            val project = projectBuilder.insertByPath(Path.trivialPath(), nodeForInsertion).build()

            it("should create root node") {
                val root = project.rootNode
                assertThat(root.children, hasSize(1))
                assertThat(root.children[0], NodeMatcher.matchesNode(nodeForInsertion.toNode()))
            }

        }
    }

    describe("ProjectBuilder with root node") {
        val root = MutableNode("root", NodeType.Folder)
        val projectBuilder = ProjectBuilder("someName", listOf(root))

        on("inserting new node") {
            val nodeForInsertion = MutableNode("someNode", NodeType.File)
            val project = projectBuilder.insertByPath(Path.trivialPath(), nodeForInsertion).build()

            it("should use root node if present") {
                assertThat(project.rootNode, NodeMatcher.matchesNode(root.toNode()))
                assertThat(root.children, hasSize(1))
                assertThat(root.children[0], Matchers.`is`(nodeForInsertion))
            }
        }
    }

    describe("ProjectBuilder with empty folders") {
        val projectBuilder = ProjectBuilder("someName")
        val nodeForInsertion = MutableNode("someNode", NodeType.Folder)
        projectBuilder.insertByPath(Path.trivialPath(), nodeForInsertion)

        on("build") {
            val project = projectBuilder.build()

            it("should filter empty folders") {
                val root = project.rootNode
                assertThat(root.children, hasSize(0))
            }
        }

    }

    describe("ProjectBuilder with valid aggregationRule") {
        val projectBuilder = ProjectBuilder("someName")
                .withAggregationRules(mapOf(
                        Pair("rloc", { x, y -> (x as Number).toLong() + (y as Number).toLong() })
                ))
        val nodeForInsertion = MutableNode("someNode", NodeType.File, mapOf(
                Pair("rloc", 1L)
        ))
        projectBuilder.insertByPath(Path.trivialPath(), nodeForInsertion)
        val nodeForInsertion2 = MutableNode("someNode2", NodeType.File, mapOf(
                Pair("rloc", 2)
        ))
        projectBuilder.insertByPath(Path.trivialPath(), nodeForInsertion2)

        on("build") {
            val project = projectBuilder.build()

            it("should aggregate Attributes") {
                val root = project.rootNode
                assertThat(root.attributes.size, `is`(1))
                assertThat(root.attributes["rloc"] as Long, `is`<Long>(3L))
            }
        }

    }
})